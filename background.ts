export { }

'use strict';

import { instance } from "store"
import { defaultConfigs, defaultLang, defaultLangList } from "settings";

instance.watch({
    hello: (c) => {
        console.log("hello", c)
    },
    "lang": (c) => {
        let newLang = c.newValue;
        console.log("lang", newLang)
        if (newLang) {
            updateRules(newLang);
        }
        if (c.newValue !== c.oldValue) {
            chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                console.log("tabs: ", tabs);
                for (let tab of tabs) {
                    if (tab.url) {
                        let res = getKV(tab.url, newLang);
                        if (res) {
                            let [key, value] = res;
                            let parsed = new URL(tab.url);
                            parsed.searchParams.set(key, value);
                            let newUrl = parsed.toString();
                            console.log("reloading", newUrl);
                            chrome.tabs.update(tab.id, { url: newUrl });
                        }
                    }
                }
            })
        }
    },
    "config": (c) => {
        console.log("config", c)
    },
    make: (c) => {
        console.log("make", c)
    }
})

function getKV(url: string, lang: string): undefined | [string, string] {
    for (let config of defaultConfigs) {
        let re = new RegExp(config.domain);
        if (url.match(re)) {
            let key = config.key;
            let mapping = new Map(Object.entries(config.mapping));
            let value = mapping.get(lang) || config.defaultValue;
            return [key, value]
        }
    }
    return;
}

function buildRule(id: number, selectedLang: string, key: string, mapping: Map<string, string>, defaultValue: string, domain: string): chrome.declarativeNetRequest.Rule {

    console.log("select lang code: ", selectedLang, mapping.get(selectedLang), mapping)
    return {
        id: id,
        priority: 1,
        action: {
            type: chrome.declarativeNetRequest.RuleActionType.REDIRECT,
            redirect: {
                transform: {
                    queryTransform: {
                        addOrReplaceParams: [
                            {
                                key: key,
                                value: mapping.get(selectedLang) || defaultValue
                            }
                        ]
                    }
                }
            }
        },
        condition: {
            resourceTypes: [chrome.declarativeNetRequest.ResourceType.MAIN_FRAME, chrome.declarativeNetRequest.ResourceType.SUB_FRAME], urlFilter: domain
        }
    }
}

// shall be called when the language is changed
function updateRules(selectedLang: string) {

    let curConfig = defaultConfigs;
    const rules = curConfig.map(({ id, key, mapping, defaultValue, domain }) => buildRule(id, selectedLang, key, new Map(Object.entries(mapping)), defaultValue, domain));
    const ids = curConfig.map(({ id }) => id);

    chrome.declarativeNetRequest.updateDynamicRules({
        addRules: rules,
        removeRuleIds: ids
    }, () => {
        console.log("rules are added");
        chrome.declarativeNetRequest.getDynamicRules(rules => { console.log("rules are: ", rules) });
    })
}

// init the rules
(async () => {
    let selectedLang = defaultLang;
    let langugeList = defaultLangList;
    let selectedLangStr = await instance.get('lang') || "en";
    console.log("selectedLangStr: ", selectedLangStr);
    if (selectedLangStr === undefined) {
        selectedLang = defaultLang;
        await instance.set('lang', selectedLang);
    } else {
        selectedLang = selectedLangStr;
    }

    let langugeListStr = await instance.get('langList');
    if (langugeListStr === undefined) {
        langugeList = defaultLangList;
        await instance.set('langList', JSON.stringify(langugeList));
    } else {
        langugeList = JSON.parse(langugeListStr) || [];
    }

    console.log("selectedLang: ", selectedLang);
    console.log("langugeList: ", langugeList);

    updateRules(selectedLang);
})();


