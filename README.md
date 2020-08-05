# hermes
Small, self-contained (using a simple sqlite file-based database) and easy to setup script to send emails to a pre-defined destination. Really cool to hook your bots to warn you about stuff! :)

**Usage**

 1. Install dependencies:
```javascript
npm install
```
2. Fill up the necessary parameters on .env.sample file and rename it to .env with
```bash
mv .env.sample .env
```
3. Set a cron job to execute index.js with
```javascript
node index.js
```
> :warning: Be aware to be inside the scripts folder, as Node.JS might not find the necessary files since the CWD (current working directory) might be somewhere else!
> i fixed that issue with:
> ```bash
> cd <scripts_folder> && node index.js

4. Hook up your apps to write on the emails.sqlite database file created on the root directory

| Column name   | Description      | 
| ------------- |:-------------:| 
| subject      | email subject **[text]** | 
| content      | email body (**[text]** => html)      | 
| attachments | attachments **[text]** => files separated by 'pipe' ( '\|' character ) |
| status      | 1=pending (default) 0=done/error (after sending) **[integer]**      | 

5. According to your preferred cron settings, everytime cron runs the script it will scan pending emails and send them to HOST_DESTINATION variable (configured on .env), using GMAIL_EMAIL and GMAIL_PASSWORD to login (also on .env, needs to enable 'unsafe apps' setting on the email that you're going to use to send the emails) and setting the nickname to GMAIL_NICKNAME (also on .env, nickname that appears to who is receiving the email, instead of the raw email)
