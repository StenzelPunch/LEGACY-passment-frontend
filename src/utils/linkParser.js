export default function linkParser(name, link) {
    switch (name) {
        case "phone":
            if (link.match(/tel:\+?[0-9]*/g)) {
                return link;
            } else {
                return "tel:" + link;
            }
        case "email":
            if (link.match(/mailto:.*/g)) {
                return link;
            } else {
                return "mailto:" + link;
            }
        case "website":
            if (link.match(/https:\/\/.*/g)) {
                return link;
            } else {
                return "https://" + link;
            }
        case "telegram":
            if (link.match(/https:\/\/t\.me\/.*/g)) {
                return link;
            } else {
                return "https://t.me/" + link;
            }
        case "viber":
            if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
                return "viber://add?number=" + link.replace("+", "%2B")
               } else {
                return "viber://chat?number=" + link 
               }
        case "whatsapp":
            if (link.match(/https:\/\/api\.whatsapp\.com\/send\?phone=.*/g)) {
                return link;
            } else {
                if (link.match(/\+380[0-9]*/g)) {
                    return "https://api.whatsapp.com/send?phone=" + link;
                } else if (link.match(/380[0-9]*/g)) {
                    return "https://api.whatsapp.com/send?phone=+" + link;
                } else {
                    return "https://api.whatsapp.com/send?phone=+38" + link;
                }
            }
        case "messenger":
            if (link.match(/https:\/\/me\.me\/.*/g)) {
                return link;
            } else {
                return "https://m.me/" + link;
            }
        case "facebook":
            return link;
        case "linkedin":
            return link;
        case "instagram":
            if (link.match(/https:\/\/www.instagram.com\/.*/g)) {
                return link;
            } else {
                return "https://www.instagram.com/" + link;
            }
        case "twitter":
            return link;
        case "youtube":
            return link;
        case "skype":
            return link;
        case "vimeo":
            return link;
        case "gmaps":
            return link;
        default:
            return link;
    }
}
