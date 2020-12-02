import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Remarkable } from 'remarkable'
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'
import Header from './Components/Header'
import Footer from './Components/Footer'
import {
  Heading,
  BoldIcon,
  ItalicIcon,
  LinkIcon,
  ImageIcon,
  QuoteIcon,
  CodeIcon,
  CodeBlockIcon,
  UnOrderedListIcon,
  OrderedListIcon,
  TableIcon,
  HelpIcon,
} from './Svgs'

const autoSave = 10000

function App() {
  const [inputValue, setInputValue] = useState(localStorage.getItem('markdown-editor') || '')
  const [inputValueCopy, setInputValueCopy] = useState(false)
  const [isSaving, setSaving] = useState(false)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  const getRawMarkup = () => {
    const md = new Remarkable('full', {
      highlight: (str, lang) => {
        if (lang && hljs.getLanguage(lang)) {
          try {
            return hljs.highlight(lang, str).value
          } catch (err) {}
        }

        try {
          return hljs.highlightAuto(str).value
        } catch (err) {}

        return '' // use external default escaping
      },
      html: true,
      breaks: true,
      typographer: true,
    })
    return { __html: md.render(inputValue) }
  }

  const copyTextToClipboard = (text: string) => {
    if (!navigator.clipboard) return

    navigator.clipboard.writeText(text).then(
      () => {
        setInputValueCopy(true)
        setTimeout(() => setInputValueCopy(false), 2000)
      },
      (err) => console.error('Could not copy text: ', err)
    )
  }

  const handleSaving = useCallback(() => {
    setSaving(true)

    localStorage.setItem('markdown-editor', inputValue)
    setTimeout(() => setSaving(false), 500)
  }, [inputValue])

  useEffect(() => {
    const saving = setTimeout(() => handleSaving(), autoSave)
    return () => clearTimeout(saving)
  }, [handleSaving])

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(event.target.value)
  }

  const inputFocus = () => inputRef && inputRef.current?.focus()

  const handleClick = (action: string) => {
    switch (action) {
      case 'Heading':
        setInputValue((prev) => prev + `\n# Heading`)
        inputFocus()
        setTimeout(() =>
          inputRef.current?.setSelectionRange(inputRef.current?.textLength - 7, inputRef.current?.textLength)
        )
        break
      case 'Bold':
        setInputValue((prev) => prev + `\n**Bold Text**`)
        inputFocus()
        setTimeout(() =>
          inputRef.current?.setSelectionRange(inputRef.current?.textLength - 11, inputRef.current?.textLength - 2)
        )
        break
      case 'Italic':
        setInputValue((prev) => prev + `\n*Italic Text*`)
        inputFocus()
        setTimeout(() =>
          inputRef.current?.setSelectionRange(inputRef.current?.textLength - 12, inputRef.current?.textLength - 1)
        )
        break
      case 'Link':
        setInputValue((prev) => prev + `\n[Title](url)`)
        inputFocus()
        setTimeout(() =>
          inputRef.current?.setSelectionRange(inputRef.current?.textLength - 4, inputRef.current?.textLength - 1)
        )
        break
      case 'Image':
        setInputValue((prev) => prev + `\n![Alt Text](https://octodex.github.com/images/dojocat.jpg)`)
        inputFocus()
        setTimeout(() =>
          inputRef.current?.setSelectionRange(inputRef.current?.textLength - 46, inputRef.current?.textLength - 1)
        )
        break
      case 'Code':
        setInputValue((prev) => prev + '\n`code..`')
        inputFocus()
        setTimeout(() =>
          inputRef.current?.setSelectionRange(inputRef.current?.textLength - 7, inputRef.current?.textLength - 1)
        )
        break
      case 'CodeBlock':
        setInputValue(
          (prev) =>
            prev +
            '\n```js\n// Syntax highlighting https://highlightjs.org/ \nconst foo = (bar) => console.log(bar);\n```'
        )
        inputFocus()
        break
      case 'Quote':
        setInputValue((prev) => prev + `\n> quote..\n`)
        inputFocus()
        setTimeout(() =>
          inputRef.current?.setSelectionRange(inputRef.current?.textLength - 8, inputRef.current?.textLength)
        )
        break
      case 'Unordered-List':
        setInputValue((prev) => prev + `\n* Item 1`)
        inputFocus()
        setTimeout(() =>
          inputRef.current?.setSelectionRange(inputRef.current?.textLength - 6, inputRef.current?.textLength)
        )
        break
      case 'Ordered-List':
        setInputValue((prev) => prev + `\n1. item`)
        inputFocus()
        setTimeout(() =>
          inputRef.current?.setSelectionRange(inputRef.current?.textLength - 4, inputRef.current?.textLength)
        )
        break
      case 'Table':
        setInputValue(
          (prev) =>
            prev +
            `\nFirst Header | Second Header\n------------ | -------------\nFirst cell | Second cell\nFirst column | Second column`
        )
        inputFocus()
        break
      case 'Clear':
        setInputValue('')
        break
      case 'Copy':
        copyTextToClipboard(inputValue)
        break

      default:
        break
    }
  }

  return (
    <div className='App'>
      <Header />

      <div className='container'>
        <div className='row'>
          <div className='col-sm input'>
            <h3>Markdown</h3>
            <div className='input-toolbar'>
              <button className='btn btn-light' onClick={() => handleClick('Heading')} title='Heading'>
                <Heading />
              </button>
              <button className='btn btn-light' onClick={() => handleClick('Bold')} title='Text Bold'>
                <BoldIcon />
              </button>
              <button className='btn btn-light' onClick={() => handleClick('Italic')} title='Text Italic'>
                <ItalicIcon />
              </button>
              <button className='btn btn-light' onClick={() => handleClick('Link')} title='Add Link'>
                <LinkIcon />
              </button>
              <button className='btn btn-light' onClick={() => handleClick('Image')} title='Insert Image'>
                <ImageIcon />
              </button>
              <button className='btn btn-light' onClick={() => handleClick('Code')} title='Code'>
                <CodeIcon />
              </button>
              <button className='btn btn-light' onClick={() => handleClick('CodeBlock')} title='Code Block'>
                <CodeBlockIcon />
              </button>
              <button className='btn btn-light' onClick={() => handleClick('Quote')} title='Add quote'>
                <QuoteIcon />
              </button>
              <button className='btn btn-light' onClick={() => handleClick('Unordered-List')} title='Unordered list'>
                <UnOrderedListIcon />
              </button>
              <button className='btn btn-light' onClick={() => handleClick('Ordered-List')} title='Ordered list'>
                <OrderedListIcon />
              </button>
              <button className='btn btn-light' onClick={() => handleClick('Table')} title='Table'>
                <TableIcon />
              </button>
              <a
                className='btn btn-light'
                href='https://jonschlinkert.github.io/remarkable/demo/'
                target='_blank'
                title='Markdown Guide'
                rel='noopener noreferrer'
              >
                <HelpIcon />
              </a>
              <button className='btn btn-light small font-bold' onClick={() => handleClick('Clear')} title='Clear'>
                Clear
              </button>
              <button className='btn btn-light small font-bold' onClick={() => handleClick('Copy')} title='Copy '>
                {!inputValueCopy ? 'Copy' : 'Copied!'}
              </button>
              <button className='btn btn-light small font-bold' onClick={handleSaving} title='Save '>
                {!isSaving ? 'Save' : 'Saving..'}
              </button>
            </div>
            <textarea
              spellCheck='false'
              className='input-text'
              onChange={handleChange}
              value={inputValue}
              ref={inputRef}
              placeholder='Type some *markdown* here! HTML Tags are allowed'
            />
          </div>
          <div className='col-sm output'>
            <h3>Output</h3>
            <div dangerouslySetInnerHTML={getRawMarkup()} className='output-text'></div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default App
