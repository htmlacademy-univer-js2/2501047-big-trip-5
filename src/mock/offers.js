const mockOffers = [
        {
          "type": "taxi",
          "offers": [
            {
              "id": "c86a2a48-b14f-48a8-8543-7da3c07c0b45",
              "title": "Upgrade to a business class",
              "price": 157
            },
            {
              "id": "536dc654-cf3f-40e6-8120-7823f2d0fc63",
              "title": "Choose the radio station",
              "price": 34
            },
            {
              "id": "09f18168-c0c0-489f-983f-ac07e1ec4483",
              "title": "Choose temperature",
              "price": 182
            },
            {
              "id": "0ff8425a-9279-4d66-9998-54d4498f5687",
              "title": "Drive quickly, I'm in a hurry",
              "price": 157
            },
            {
              "id": "6e6e9a9e-7b2f-4e2f-bf6a-d1224a794a1d",
              "title": "Drive slowly",
              "price": 141
            }
          ]
        },
        {
          "type": "bus",
          "offers": [
            {
              "id": "b1a5e0f4-0c91-4610-a493-631e8408ff68",
              "title": "Infotainment system",
              "price": 58
            },
            {
              "id": "10862ab3-f630-4fd1-ba7b-03a1ecb3b236",
              "title": "Order meal",
              "price": 39
            },
            {
              "id": "4a438d61-af1c-479d-951f-612cfbc7da33",
              "title": "Choose seats",
              "price": 198
            }
          ]
        },
        {
          "type": "train",
          "offers": [
            {
              "id": "ac93242c-4e53-4bcc-b7c6-ba920d9ccdec",
              "title": "Book a taxi at the arrival point",
              "price": 92
            },
            {
              "id": "c79f6af9-402e-422d-b1d6-ce51251fd6a8",
              "title": "Order a breakfast",
              "price": 131
            },
            {
              "id": "043e8d63-64ad-4642-82ab-6b7ba5f2eefa",
              "title": "Wake up at a certain time",
              "price": 79
            }
          ]
        },
        {
          "type": "flight",
          "offers": [
            {
              "id": "4befcf92-428e-44d9-88a4-a5a67c2253fe",
              "title": "Choose meal",
              "price": 68
            },
            {
              "id": "5259a48b-db26-4d39-b66a-7d72988f495f",
              "title": "Choose seats",
              "price": 123
            },
            {
              "id": "a4c4bc85-06fd-4b1f-a2ea-fb2dd47f1c83",
              "title": "Upgrade to comfort class",
              "price": 148
            },
            {
              "id": "c7f9a770-c4dd-4e67-abe0-d98cd22c0d33",
              "title": "Upgrade to business class",
              "price": 160
            },
            {
              "id": "3284d090-d08f-4186-9001-1be84d63cff0",
              "title": "Add luggage",
              "price": 81
            },
            {
              "id": "a6ac7c3f-94cd-4f4a-b9cd-c7f31cc1d12f",
              "title": "Business lounge",
              "price": 165
            }
          ]
        },
        {
          "type": "check-in",
          "offers": [
            {
              "id": "31198dad-f27f-4075-9d8d-4b5e04a8c544",
              "title": "Choose the time of check-in",
              "price": 163
            },
            {
              "id": "e90915f0-c188-4fb1-892c-9bbd93ab7310",
              "title": "Choose the time of check-out",
              "price": 32
            },
            {
              "id": "f302ec3c-a69e-4d57-b3c8-045b74e02625",
              "title": "Add breakfast",
              "price": 58
            },
            {
              "id": "02c36ee0-ad63-4e14-bf7b-7e0d648c6595",
              "title": "Laundry",
              "price": 99
            },
            {
              "id": "54be7b0a-255a-43a2-a267-6a9d522b9150",
              "title": "Order a meal from the restaurant",
              "price": 124
            }
          ]
        },
        {
          "type": "sightseeing",
          "offers": []
        },
        {
          "type": "ship",
          "offers": [
            {
              "id": "83b09ff2-c275-4795-a996-448bd053d76c",
              "title": "Choose meal",
              "price": 56
            },
            {
              "id": "6fa6f4f3-bb9f-47a1-bc74-7fb05acdd1be",
              "title": "Choose seats",
              "price": 95
            },
            {
              "id": "f32be5ed-5657-44bf-8c46-2cee8028129b",
              "title": "Upgrade to comfort class",
              "price": 139
            },
            {
              "id": "3788db1e-b61e-4bc8-b1fe-cb3c17a2efd9",
              "title": "Upgrade to business class",
              "price": 30
            },
            {
              "id": "7d081f7a-4e92-445d-88a6-d04721125b7e",
              "title": "Add luggage",
              "price": 178
            },
            {
              "id": "b643c171-e785-481f-96b8-686fbfe3df3e",
              "title": "Business lounge",
              "price": 184
            }
          ]
        },
        {
          "type": "drive",
          "offers": [
            {
              "id": "81a37f6d-038c-4c94-ae7a-4e788eee9a34",
              "title": "With automatic transmission",
              "price": 173
            },
            {
              "id": "2baa6b70-f489-4503-b17d-6d189ca0b5b4",
              "title": "With air conditioning",
              "price": 83
            }
          ]
        },
        {
          "type": "restaurant",
          "offers": [
            {
              "id": "1863a1d3-70d5-4b40-a5b8-b0905b9a399b",
              "title": "Choose live music",
              "price": 162
            },
            {
              "id": "9228a04b-43c1-4dd2-8da8-7d338251b054",
              "title": "Choose VIP area",
              "price": 129
            }
          ]
        }
];

function getOffers() {
    return mockOffers;
}

export {getOffers};