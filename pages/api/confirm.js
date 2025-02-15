import sendgrid from '@sendgrid/mail'

export default async function handle(req, res) {
  if (process.env.SG_API === '') {
    return res.status(200).json({ success: true })
  }
  switch (req.method) {
    case 'POST':
      try {
        sendgrid.setApiKey(process.env.SG_API)
        await sendgrid.send({
          to: req.body.email, // Your email where you'll receive emails
          from: process.env.SG_FROM, // your website email address here
          subject: `Open Components Hackathon Confirmation: You have successfully registered!`,
          html: `<div style="padding:8px;max-width:800px;font-size:1.2rem;">
<img src="https://opencomponents.io/oce_banner.png" style="width:100%;margin-bottom:20px;"/>
<p>Dear ${req.body.name},<br/>
<br/>
Thank you for signing up for the Open Components Hackathon 2023.<br/>
<br/>
<b>Hackathon Theme</b>: Components for the Translation Resource Ecosystem<br/>
<b>Learnathon</b> (Online): <b>February&nbsp;13&nbsp;-&nbsp;17,2023</b><br/>
<b>Hackathon</b> (Online/Multi-site): <b>February&nbsp;20&nbsp;-&nbsp;24,2023</b></p>
<p>If you have registered as an active participant, please ensure you are part of a team. If you'd like to create a new team, please fill out a <a href="https://forms.gle/VbeTG472AKbhpLnw9">form</a>. If you'd like to join an existing team, please reach out to other participants on <a href="https://discord.gg/jtTRhEMH4q">Discord</a>.</p>
<p>Please <a href="https://calendar.google.com/calendar/event?action=TEMPLATE&tmeid=NmNoNTNoa2RnNWNnbHFvdHQ3c2NucjVydjlfMjAyMzAyMTNUMTQwMDAwWiBjX2VhY2RmYzkxY2E1ZjFmOWZmODAzZWNkZTliNzMzZDBjODU0ZjU4YjQ3MWNhOThkM2FkOGMxMDlkNjExMzgyY2JAZw&tmsrc=c_eacdfc91ca5f1f9ff803ecde9b733d0c854f58b471ca98d3ad8c109d611382cb%40group.calendar.google.com&scp=ALL">click here</a> to add this event to your calendar. You can visit our <a href="https://opencomponents.io/hackathon/schedule">hackathon site</a> to learn more about the event. We look forward to seeing you soon!
</p>
<p>Thanks,<br/>
Chris Klapp, aka klappy<br/>
ETEN Innovation Lab</p>
</div>`,
        })
      } catch (error) {
        return res.status(error.statusCode || 500).json({ error: error.message })
      }

      return res.status(200).json({ success: true })
    default:
      return res.status(404).end('Error')
  }
}
