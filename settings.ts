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
    'en': 'us-en'
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
        mapping: langMapChrome,
        defaultValue: defaultLangDuckduckgo,
        domain: 'duckduckgo.com/*'
    }
]


const defaultLangList = ['en', 'zh-CN', 'zh-TW', 'zh-HK'];
const defaultLang = 'en';

export { defaultConfigs, defaultLangChrome, langMapChrome, defaultLangDuckduckgo, langMapDuckduckgo, defaultLangList, defaultLang};