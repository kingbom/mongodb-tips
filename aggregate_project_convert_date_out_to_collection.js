let etaxDb = db.getSiblingDB("etax");
const startDate = "2021-07-01T00:00:00.000Z";
const endDate = "2021-09-01T00:00:00.000Z";
const size = etaxDb.etax_reports.find(
    {
        createdDate: { $gte: ISODate(startDate), $lt: ISODate(endDate) },
        status: "FILE_RECEIVED"
    }
).size();

console.log(`size is : ${size}`);

if (size == 0) {
    etaxDb.etax_reports.aggregate(
        [
            {
                $match: {
                    createdDate: { $gte: ISODate(startDate), $lt: ISODate(endDate) },
                    status: "FILE_RECEIVED"
                }
            },
            {
                $project: {
                    _id: 1,
                    year: { $year: { date: "$createdDate" } },
                    month: { $month: { date: "$createdDate" } },
                    dayOfMonth: { $dayOfMonth: { date: "$createdDate" } },
                    status: 1,
                    resultFile: 1,
                    errorFile: 1,
                    message: 1,
                    createdBy: 1,
                    createdDate: 1,
                    lastModifiedBy: 1,
                    lastModifiedDate: 1,
                    _class: 1

                }
            },
            {
                $out: "email_event_delivery_reports"

            }
        ]
    );
} else {
    console.log(`can not copy etax_reports to email_event_delivery_reports because has data period ${startDate} - ${endDate}`);
}

console.log("script run successfully !!");
