type TQueries = { [key: string]: string | undefined };

const url = {
    getQueries: (href: string) => {
        const queries: TQueries = {};
        const urlObject = new URL(href);
        urlObject.searchParams.forEach((value, key) => {
            queries[key] = value;
        });
        return queries;
    },
    replaceQueries: (href: string, queries: TQueries) => {
        const existingQueries = url.getQueries(href);
        const finalQueries = { ...existingQueries, ...queries };
        const newUrl = new URL(href);
        newUrl.search = "";
        for (const key in finalQueries) {
            const value = finalQueries[key];
            if (value) {
                newUrl.searchParams.append(key, value);
            }
        }
        return newUrl.toString();
    },
    encode: (str: string) => {
        return encodeURIComponent(str);
    },
    decode: (str: string) => {
        return decodeURIComponent(str);
    },
};

export default url;
