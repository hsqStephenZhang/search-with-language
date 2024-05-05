import { useStorage } from "@plasmohq/storage/hook"

import { instance } from "store"
import { defaultLang, defaultLangList } from "settings"

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

  let strList: string[] = JSON.parse(list)
  let langList = strList.map((val) => {
    return {
      key: val,
      val: val
    }
  })

  const handleClicked = async (val: string) => {
    // update the language list's order
    let newStrList = [val]
    for (let i = 0; i < strList.length; i++) {
      if (strList[i] !== val) {
        newStrList.push(strList[i])
      }
    }
    await setLang(val)
    await setList(JSON.stringify(newStrList))
  }

  return (
    <div>
      <div>
        {langList.map((item) => (
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
