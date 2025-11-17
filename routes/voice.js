

// backend/routes/voice.js - Webhook endpoints
import express from 'express';
import twilio from 'twilio';

const router = express.Router();
const VoiceResponse = twilio.twiml.VoiceResponse;

router.post('/outgoing', (req, res) => {
    const twiml = new VoiceResponse();
    const dial = twiml.dial({
        callerId: process.env.TWILIO_PHONE_NUMBER
    });

    const phoneNumber = req.body.To;
    console.log('Outgoing call to:', phoneNumber);
    if (phoneNumber) {
        dial.number(phoneNumber);
    } else {
        twiml.say('Sorry, we could not complete your call.');
    }

    res.type('text/xml');
    res.send(twiml.toString());
});

// Handle incoming calls
router.post('/', (req, res) => {
    const twiml = new VoiceResponse();

    const dial = twiml.dial();
    dial.client('user123');

    res.type('text/xml');
    res.send(twiml.toString());
});

export default router;