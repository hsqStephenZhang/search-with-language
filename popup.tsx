import { defaultLang, defaultLangList } from "settings"
import { instance } from "store"

import { useStorage } from "@plasmohq/storage/hook"

import "./popup.css"

function IndexPopup() {
  const [list, setList] = useStorage(
    {
      key: "langList",
      instance: instance
    },
    JSON.stringify(defaultLangList)
  )

  const [lang, setLang] = useStorage(
    {
      key: "lang",
      instance: instance
    },
    defaultLang
  )

  let parsed: { key: string; val: string }[] = JSON.parse(list)

  const handleClicked = async (val: string) => {
    // update the language list's order
    let newStrList = [
      {
        key: val,
        val: val
      }
    ]
    for (let i = 0; i < parsed.length; i++) {
      if (parsed[i].key !== val) {
        newStrList.push(parsed[i])
      }
    }
    await setLang(val)
    await setList(JSON.stringify(newStrList))
  }

  return (
    <div>
      <div>
        {parsed.map((item) => (
          <button
            onClick={(e) => handleClicked(item.val)}
            value={item.val}
            className={`lang-button ${item.val === lang ? "active" : ""}`}>
            {item.val}
          </button>
        ))}
      </div>
      <a href="options.html">Options</a>
    </div>
  )
}

export default IndexPopup
