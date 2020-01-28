const expandLinks = () => {
    return [
        { name: "phone", required: false, value: "" },
        { name: "email", required: false, value: "" },
        { name: "website", required: false, value: "" },
        { name: "telegram", required: false, value: "" },
        { name: "viber", required: false, value: "" },
        { name: "whatsapp", required: false, value: "" },
        { name: "messenger", required: false, value: "" },
        { name: "facebook", required: false, value: "" },
        { name: "linkedin", required: false, value: "" },
        { name: "instagram", required: false, value: "" },
        { name: "twitter", required: false, value: "" },
        { name: "youtube", required: false, value: "" },
        { name: "skype", required: false, value: "" },
        { name: "vimeo", required: false, value: "" },
        { name: "gmaps", required: false, value: "" }
    ];
};

const expandInfo = () => {
    return [
        { name: "url", required: true, value: "" },
        { name: "first_name", required: true, value: "" },
        { name: "last_name", required: true, value: "" },
        { name: "patronymic", required: false, value: "" },
        { name: "info", required: false, value: "" },
        { name: "user_phone", required: true, value: "" },
        { name: "user_email", required: false, value: "" }
    ];
};

const prepareLinks = links => {
    return links.map(item => {
        return { name: item.name, value: item.value };
    });
};

const prepareInfo = info => {
    return info.reduce((accum, item) => {
        accum[item.name] = item.value;
        return accum;
    }, {});
};

const parseInfo = member => {
    let info = expandInfo().map(item => {
        item.value = member[item.name]
        return item
    })

    return [member, info, member.links];
};

export default { expandLinks, expandInfo, prepareLinks, prepareInfo, parseInfo };

export { expandLinks, expandInfo, prepareLinks, prepareInfo, parseInfo };
