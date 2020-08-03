const nodemailer = require('nodemailer');
const emailModel = require('./emailModel');
require('dotenv').config();
emailModel.sync();

async function main(){
    const transporter = nodemailer.createTransport({
        service: 'gmail', 
        auth: {
            user: process.env.GMAIL_EMAIL,
            pass: process.env.GMAIL_PASSWORD
        }
    });

    //loop through table and try sending each email
    let emails = await emailModel.findAll({
        where: {
            status: 1
        }
    });

    if(emails.length === 0){
        console.log('No emails found to send. Finishing Hermes!');
        return;
    }

    for(let i = 0; i < emails.length; i++){
        let mailOptions = {
            from: '"'+process.env.GMAIL_NICKNAME+'" <'+process.env.GMAIL_EMAIL+'>',
            to: process.env.EMAIL_DESTINATION,
            subject: emails[i].subject,
            html: emails[i].content,
        }

        if(emails[i].attachment){

            let allAttachments = emails[i].attachment.split("|");

            mailOptions.attachments = [];

            for(attachment of allAttachments){
                let filepath = attachment.split("/");
                mailOptions.attachments.push({
                    filename: filepath[filepath.length - 1],
                    path: filepath.join("/")
                });
            }

        }

        let result = await transporter.sendMail(mailOptions);
        emailModel.update({status: 0}, {where: { id: emails[i].id}});

        console.log(`Successfully emailed: ${JSON.stringify(result)}`);
    }

    console.log(`Finished sending ${emails.length} emails`);

}

main().catch(console.error);
