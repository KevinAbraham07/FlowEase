import {google} from "googleapis";
import {oauth2Client} from "../config/googleConfig.js";


const getLastEmails = async (tokens)=>{
    oauth2Client.setCredentials(tokens);

    const gmail = google.gmail({ version: "v1", auth: oauth2Client });
    const response = await gmail.users.messages.list({
        userId: "me",
        maxResults: 5,
    });
    const emails = [];
    for (let msg of response.data.messages){
        const details = await gmail.users.messages.get({ userId: "me", id: msg.id });
        emails.push({
            id: msg.id,
            snippet: details.data.snippet,
            subject: details.data.payload.headers.find(h => h.name === "Subject")?.value,
            date: details.data.payload.headers.find(h => h.name === "Date")?.value
        });
    }

    return emails;
};


export default getLastEmails;