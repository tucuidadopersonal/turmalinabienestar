const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware para procesar formularios
app.use(bodyParser.urlencoded({ extended: false }));

// Ruta para el formulario
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/checkout.html');
});

// Ruta para procesar y enviar el correo
app.post('/enviar', async (req, res) => {
    const { name, email, message } = req.body;

    // Configuración del transporte de Nodemailer
    const transporter = nodemailer.createTransport({
        service: 'gmail', // Cambia esto si usas otro servicio
        auth: {
            user: 'tu-correo@gmail.com', // Reemplaza con tu correo
            pass: 'tu-contraseña'        // Reemplaza con tu contraseña
        }
    });

    // Configuración del correo
    const mailOptions = {
        from: email,
        to: 'creciendoconestilo1111@gmail.com',
        subject: 'Nuevo mensaje del formulario',
        text: `Nombre: ${name}\nCorreo: ${email}\nMensaje: ${message}`
    };

    try {
        await transporter.sendMail(mailOptions);
        res.send('¡Correo enviado exitosamente!');
    } catch (error) {
        console.error(error);
        res.send('Hubo un error al enviar el correo.');
    }
});

// Inicia el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
