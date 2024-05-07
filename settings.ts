const defaultLangChrome = 'lang_en';
const langMapChrome = {
    'zh-CN': 'lang_zh-CN',
    'zh-TW': 'lang_zh-TW',
    'zh-HK': 'lang_zh-HK',
    'en': 'lang_en'
}

const defaultLangDuckduckgo = 'us-en';
const langMapDuckduckgo = {
    'zh-CN': 'cn-zh',
    'zh-TW': 'tw-tzh',
    'zh-HK': 'hk-tzh',
    'en': 'en-US'
}

const defaultLangBing = 'en-US';
const langMapBing = {
    'zh-CN': 'zh-CN',
    'zh-TW': 'zh-TW',
    'zh-HK': 'zh-HK',
    'en': 'en-US'
}


const defaultConfigs = [
    {
        id: 198964,
        key: 'lr',
        mapping: langMapChrome,
        defaultValue: defaultLangChrome,
        domain: 'google.com/search*'
    },
    {
        id: 198965,
        key: 'kl',
        mapping: langMapDuckduckgo,
        defaultValue: defaultLangDuckduckgo,
        domain: 'duckduckgo.com/*'
    },
    {
        id: 198966,
        key: 'mkt',
        mapping: langMapBing,
        defaultValue: defaultLangBing,
        domain: 'bing.com/search*'
    }
]


const defaultLangList = ['en', 'zh-CN', 'zh-TW', 'zh-HK'].map((val)=>{
    return {
        key: val,
        val: val
    }
});
const defaultLang = 'en';

export { defaultConfigs, defaultLangChrome, langMapChrome, defaultLangDuckduckgo, langMapDuckduckgo, defaultLangList, defaultLang};