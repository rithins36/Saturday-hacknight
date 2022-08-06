function insert_event() {
    const {google} = require('googleapis')
    
    const {OAuth2} = google.auth
    
    const oAuth2Client = new OAuth2(
        '556710189842-chr06019o0sqt6piqd7hba3uaa2mo05t.apps.googleusercontent.com',
        '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'
    )
    
    oAuth2Client.setCredentials({
        refresh_token: '1//04BQ3OxfaL1hcCgYIARAAGAQSNwF-L9Ir-6XxNgTG8F-iAk7SkqoI_SPCfNRnR7LGo8FdLVSFeqV0nWSB-o6gVA-E4t7N0ne7J0g'
    })
    
    const calendar = google.calendar({version: 'v3', auth: oAuth2Client})
    
    const eventStartTime = new Date()
    eventStartTime.setDate(eventStartTime.getDay() + 2)
    
    const eventEndTime = new Date()
    eventEndTime.setDate(eventEndTime.getDay() + 4)
    eventEndTime.setMinutes(eventEndTime.getMinutes() + 45)
    
    const event = {
        summary: document.getElementById("name").value,
        location: document.getElementById("location").value,
        description: document.getElementById("description").value,
        start: {
            dateTime: eventStartTime,
            timeZone: 'Asia/Kolkata'
        },
        end : {
            dateTime: eventEndTime,
            timeZone: 'Asia/Kolkata'
        }
    }
    
    calendar.freebusy.query({
        resource: {
            timeMin: eventStartTime,
            timeMax: eventEndTime,
            timeZone: 'Asia/Kolkata',
            items: [{id: 'primary'}]
        },
    }, (err, res) => {
        if (err) return console.error("Busy error", err)
    
        const eventsArr = res.data.calendars.primary.busy
    
        if (eventsArr.length === 0) return calendar.events.insert({
            calendarId: 'primary', resource: event
        }, err => {
            if (err) return console.error('Calendar event creation error')
    
            return console.log('Calendar event created')
        })
    
        return console.log("Sorry I'm Busy")
    })
}