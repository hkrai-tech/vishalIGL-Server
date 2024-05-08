const express = require('express');
const { isAuthenticated } = require('../../middlewares');
const excelJS = require("exceljs")
const { mailXl } = require("../../config/mailer")
const { findUserById, linkLocationToUser, getAllLocations, saveDataToForm1, exportData, getMetricsForm1 } = require('./users.service');

const router = express.Router();

router.get('/profile', isAuthenticated, async (req, res, next) => {
    try {
        const { userId } = req.payload;
        const user = await findUserById(userId);
        delete user.password;
        res.json(user);
    } catch (err) {
        next(err);
    }
});

router.get("/location", isAuthenticated, async (req, res, next) => {
    const locations = await getAllLocations()
    return res.status(200).json({
        locations
    })
})

router.post('/location', isAuthenticated, async (req, res, next) => {
    try {
        const { userId } = req.payload;
        const { location_id } = req.body

        await linkLocationToUser({ userId, location_id })
        return res.status(200)
    } catch (err) {
        next(err)
    }
})

router.post('/form1', isAuthenticated, async (req, res, next) => {

    try {
        const { userId } = req.payload;
        const { location_id } = req.body

        console.log("hello")

        await saveDataToForm1(req.body, userId)
        return res.status(200).json({
            msg: "hogaya kaam"
        })
    } catch (error) {
        next(error)
    }
})

router.post('/export', isAuthenticated, async (req, res, next) => {
    try {

        const { userId } = req.payload;
        const { location_id } = req.body

        const user = await findUserById(userId)

        console.log(user)


        const result = await exportData({ userId, location_id })
        console.log(result)


        const dataObject = {
            id: 'afb48f03-e8a6-449e-ae53-43fe2163cf00',
            user_id: 'da7fff0d-39d7-4c5d-8a4f-e8d5b52a8e35',
            location_id: 'b35fd2d8-1e81-4182-9eb1-f009d8c162e2',
            name: 'Harikesh Rai',
            phone_number: '8697422699',
            location: 'West',
            shift_incharge_name: 'John Doe',
            zone: 'Zone A',
            control_room: 'Control Room 1',
            Date: "2024-02-14T12:00:00.000Z",
            valve_number: 'V001',
            valve_size: '2 inches',
            MDPE_length: '10 meters',
            loc_name: 'Location Name',
            mdpe_length: '5 meters',
            Condition: 'true',
            cleanliness: 'true',
            proper_sand_availability: 'true',
            paint_on_chamber_lid: 'true',
            construction_condition_of_chamber_and_lid: 'true',
            remarks: 'Example remarks',
        }

        const headerAndKeyPairs = Object.entries(dataObject)
            .filter(([key]) => !['id', 'user_id', 'location_id'].includes(key))// Ignore the field with id
            .map(([key, value]) => ({ header: key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()), key }));

        console.log(headerAndKeyPairs);


        const workbook = new excelJS.Workbook();
        const worksheet = workbook.addWorksheet("Form1");
        const path = "./files";  // Path to download excel
        // Column for data in excel. key must match data key
        worksheet.columns = headerAndKeyPairs
        // Looping through User data
        let counter = 1;
        result.forEach((user) => {
            //user.s_no = counter;
            worksheet.addRow(user); // Add data in worksheet
            //counter++;
        });
        // Making first line in excel bold
        worksheet.getRow(1).eachCell((cell) => {
            cell.font = { bold: true };
        });

        const xl = await workbook.xlsx.writeBuffer();
        const filename = 'Valve Chamber Monitoring Data'

        mailXl(user, xl, filename)

        return res.status(200).json({
            form_result: result,
            msg: "success!"
        })
    } catch (error) {
        next(error)
    }

})

router.post("/metrics", isAuthenticated, async (req, res, next) => {
    try {
        const { userId } = req.payload;
        const { location_id } = req.body

        const result = await getMetricsForm1(location_id)

        return res.status(200).json({
            result: result?.length,
            total: "100"
        })

    } catch (error) {
        next(error)
    }
})

module.exports = router;