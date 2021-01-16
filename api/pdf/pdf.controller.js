const pdfService = require('./pdf.service');


async function getPdf(req, res) {
    try {
        const pdf = await pdfService.getById(req.params.id);
        res.send(pdf);
    } catch (err) {
        res.status(404).send({ error: 'Cannot get PDF' });
    }
}

async function savePdf(req, res) {
    try {
        const pdf = await pdfService.save(req.body);
        res.send(pdf);
    } catch (err) {
        res.status(500).send({ error: 'Cannot save PDF' });
    }

}

module.exports = {
    getPdf,
    savePdf
}