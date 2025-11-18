

// backend/routes/voice.js - Webhook endpoints
import express from 'express';
import twilio from 'twilio';

const router = express.Router();
const VoiceResponse = twilio.twiml.VoiceResponse;

router.post('/outgoing', (req, res) => {
    const twiml = new VoiceResponse();
    const twilioNumber = '+12176018762';
    const phoneNumber = req.body.To;
    if (phoneNumber && phoneNumber !== twilioNumber) {
        console.log('Making outbound call to:', phoneNumber);

        const dial = twiml.dial({
            callerId: twilioNumber
        });
        dial.number(phoneNumber);
    } else {
        console.log('No valid outbound number or calling self');
        // Return empty response like Python version
        res.type('text/xml');
        res.send('');
        return;
    }

    console.log('Generated TwiML:', twiml.toString());
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