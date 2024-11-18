import Data from '../model/data.js';

// GET all data

router.get('/api/data', async (req, res) => {
    try {
        const data = await Data.find();
        res.json(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// POST new data

router.post('/api/data', async (req, res) => {
    const { name, value } = req.body;
    try {
        const newData = new Data({ name, value });
        await newData.save();
        res.status(201).json(newData);
    } catch (error) {
        console.error('Error creating data:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// PUT (update) data

router.put('/api/data/:id', async (req, res) => {
    const { id } = req.params;
    const { name, value } = req.body;
    try {
        const updatedData = await Data.findByIdAndUpdate(id, { name, value }, { new: true });
        if (!updatedData) {
            return res.status(404).json({ error: 'Data not found' });
        }
        res.json(updatedData);
    } catch (error) {
        console.error('Error updating data:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// DELETE data

router.delete('/api/data/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedData = await Data.findByIdAndDelete(id);
        if (!deletedData) {
            return res.status(404).json({ error: 'Data not found' });
        }
        res.json({ message: 'Data deleted successfully' });
    } catch (error) {
        console.error('Error deleting data:', error);
        res.status(500).json({ error: 'Server error' });
    }
});
