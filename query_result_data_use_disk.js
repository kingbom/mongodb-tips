let orderDb = db.getSiblingDB("order");
orderDb.z8_conditions.aggregate(
    [
        {
            "$project": {
                "requestNo": 1,
                "priority": 1,
                "productLevel": 1,
                "parameterValue": 1,
                "startDate": 1,
                "endDate": 1,
                "store": "$storeCodeName",
                "storeCode": 1,
                "productValue":"$productValue.name"
            }
        },
        { "$match": {} },
        { "$sort": { "priority": 1, "startDate": 1, "storeCode": 1, "productValue": 1 } },
        { "$skip": 200000 },
        { "$limit": 100000 }
    ],
    { allowDiskUse: true }
);