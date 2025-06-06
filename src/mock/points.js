import {nanoid} from 'nanoid';
import {getRandomArrayElement} from '../utils/common.js';


const mockPoints0 = [];
const mockPoints = [
        {
          "id": "2ed1456d-454d-40b1-886c-8d78434eaf55",
          "basePrice": 5149,
          "dateFrom": "2025-06-06T12:00:22.952Z",
          "dateTo": "2025-06-07T04:00:22.952Z",
          "destination": "71ac05ee-1fbf-47b5-a982-605bf344dfbf",
          "isFavorite": false,
          "offers": [
            "5259a48b-db26-4d39-b66a-7d72988f495f",
            "a4c4bc85-06fd-4b1f-a2ea-fb2dd47f1c83",
            "c7f9a770-c4dd-4e67-abe0-d98cd22c0d33",
            "3284d090-d08f-4186-9001-1be84d63cff0",
            "a6ac7c3f-94cd-4f4a-b9cd-c7f31cc1d12f"
          ],
          "type": "flight"
        },
        {
          "id": "e9c99472-94f2-4306-bc15-bea2503ea92e",
          "basePrice": 1905,
          "dateFrom": "2025-06-06T04:00:22.952Z",
          "dateTo": "2025-06-07T15:00:22.952Z",
          "destination": "690d79cf-6ab9-4dd2-b8f1-f6d18b22d03e",
          "isFavorite": false,
          "offers": [
            "b1a5e0f4-0c91-4610-a493-631e8408ff68",
            "10862ab3-f630-4fd1-ba7b-03a1ecb3b236",
            "4a438d61-af1c-479d-951f-612cfbc7da33"
          ],
          "type": "bus"
        },
        {
          "id": "36db62e3-9614-42d4-ad3a-945a57bcf0b9",
          "basePrice": 6378,
          "dateFrom": "2024-03-14T15:00:22.952Z",
          "dateTo": "2024-03-16T15:00:22.952Z",
          "destination": "532a1698-0f25-4198-af15-be7dd79fa75f",
          "isFavorite": true,
          "offers": [
            "1863a1d3-70d5-4b40-a5b8-b0905b9a399b",
            "9228a04b-43c1-4dd2-8da8-7d338251b054"
          ],
          "type": "restaurant"
        },
        {
          "id": "a2e3c694-77f8-469b-bce7-594182afaa31",
          "basePrice": 1292,
          "dateFrom": "2024-03-16T15:00:22.952Z",
          "dateTo": "2024-03-17T12:00:22.952Z",
          "destination": "bf22de7d-069b-4806-80bf-07800007224f",
          "isFavorite": false,
          "offers": [
            "5259a48b-db26-4d39-b66a-7d72988f495f",
            "a4c4bc85-06fd-4b1f-a2ea-fb2dd47f1c83",
            "c7f9a770-c4dd-4e67-abe0-d98cd22c0d33",
            "3284d090-d08f-4186-9001-1be84d63cff0",
            "a6ac7c3f-94cd-4f4a-b9cd-c7f31cc1d12f"
          ],
          "type": "flight"
        },
        {
          "id": "9badc3d2-c20e-4dcb-b857-ce06c5f39452",
          "basePrice": 5603,
          "dateFrom": "2027-03-17T12:00:22.952Z",
          "dateTo": "2027-03-18T04:00:22.952Z",
          "destination": "71ac05ee-1fbf-47b5-a982-605bf344dfbf",
          "isFavorite": false,
          "offers": [
            "a4c4bc85-06fd-4b1f-a2ea-fb2dd47f1c83",
            "c7f9a770-c4dd-4e67-abe0-d98cd22c0d33",
            "3284d090-d08f-4186-9001-1be84d63cff0",
            "a6ac7c3f-94cd-4f4a-b9cd-c7f31cc1d12f"
          ],
          "type": "flight"
        },
        {
          "id": "4b42638f-5621-43e4-b724-8b0802e67d02",
          "basePrice": 9870,
          "dateFrom": "2027-03-18T04:00:22.952Z",
          "dateTo": "2027-03-19T04:00:22.952Z",
          "destination": "690d79cf-6ab9-4dd2-b8f1-f6d18b22d03e",
          "isFavorite": true,
          "offers": [
            "c7f9a770-c4dd-4e67-abe0-d98cd22c0d33",
            "3284d090-d08f-4186-9001-1be84d63cff0",
            "a6ac7c3f-94cd-4f4a-b9cd-c7f31cc1d12f"
          ],
          "type": "flight"
        },
        {
          "id": "8450fd2b-e8ef-4c80-b9e5-68e62f57edee",
          "basePrice": 550,
          "dateFrom": "2027-03-19T04:00:22.952Z",
          "dateTo": "2027-03-21T00:00:22.952Z",
          "destination": "799a1d5a-b2f9-4451-b066-b4e0a38777c8",
          "isFavorite": true,
          "offers": [
            "f302ec3c-a69e-4d57-b3c8-045b74e02625",
            "02c36ee0-ad63-4e14-bf7b-7e0d648c6595",
            "54be7b0a-255a-43a2-a267-6a9d522b9150"
          ],
          "type": "check-in"
        },
        {
          "id": "251bb1f9-b408-4a33-83e0-6e4b53fe0f37",
          "basePrice": 6916,
          "dateFrom": "2027-03-21T00:00:22.952Z",
          "dateTo": "2027-03-21T23:00:22.952Z",
          "destination": "71ac05ee-1fbf-47b5-a982-605bf344dfbf",
          "isFavorite": true,
          "offers": [
            "10862ab3-f630-4fd1-ba7b-03a1ecb3b236",
            "4a438d61-af1c-479d-951f-612cfbc7da33"
          ],
          "type": "bus"
        },
        {
          "id": "f19a9e22-1a7e-4bd7-b791-f826db6a8642",
          "basePrice": 3412,
          "dateFrom": "2027-03-21T23:00:22.952Z",
          "dateTo": "2027-03-23T04:00:22.952Z",
          "destination": "532a1698-0f25-4198-af15-be7dd79fa75f",
          "isFavorite": false,
          "offers": [
            "3788db1e-b61e-4bc8-b1fe-cb3c17a2efd9",
            "7d081f7a-4e92-445d-88a6-d04721125b7e",
            "b643c171-e785-481f-96b8-686fbfe3df3e"
          ],
          "type": "ship"
        },
        {
          "id": "acf02a29-f79f-4cde-a14d-79cafaf159e7",
          "basePrice": 398,
          "dateFrom": "2027-03-23T04:00:22.952Z",
          "dateTo": "2027-03-23T11:00:22.952Z",
          "destination": "bf22de7d-069b-4806-80bf-07800007224f",
          "isFavorite": true,
          "offers": [
            "9228a04b-43c1-4dd2-8da8-7d338251b054"
          ],
          "type": "restaurant"
        },
        {
          "id": "eef80da2-1376-404e-9c19-f1149bb161b6",
          "basePrice": 9352,
          "dateFrom": "2027-03-23T11:00:22.952Z",
          "dateTo": "2027-03-25T07:00:22.952Z",
          "destination": "690d79cf-6ab9-4dd2-b8f1-f6d18b22d03e",
          "isFavorite": true,
          "offers": [
            "81a37f6d-038c-4c94-ae7a-4e788eee9a34",
            "2baa6b70-f489-4503-b17d-6d189ca0b5b4"
          ],
          "type": "drive"
        },
        {
          "id": "2b860ba7-c3d4-41ab-8c14-a69992067725",
          "basePrice": 7451,
          "dateFrom": "2027-03-25T07:00:22.952Z",
          "dateTo": "2027-03-27T06:00:22.952Z",
          "destination": "bf22de7d-069b-4806-80bf-07800007224f",
          "isFavorite": true,
          "offers": [],
          "type": "train"
        },
        {
          "id": "4f21fb93-04dc-4e85-a6ec-6b89bfc3e99e",
          "basePrice": 1954,
          "dateFrom": "2027-03-27T06:00:22.952Z",
          "dateTo": "2027-03-29T03:00:22.952Z",
          "destination": "690d79cf-6ab9-4dd2-b8f1-f6d18b22d03e",
          "isFavorite": true,
          "offers": [],
          "type": "sightseeing"
        },
        {
          "id": "e6aaceef-057f-4f46-af62-d4dbb4cc3063",
          "basePrice": 4576,
          "dateFrom": "2027-03-29T03:00:22.952Z",
          "dateTo": "2027-03-29T13:00:22.952Z",
          "destination": "532a1698-0f25-4198-af15-be7dd79fa75f",
          "isFavorite": false,
          "offers": [],
          "type": "bus"
        },
        {
          "id": "0c543048-a9c4-4036-89ba-7c6386f84516",
          "basePrice": 3827,
          "dateFrom": "2027-03-29T13:00:22.952Z",
          "dateTo": "2027-03-31T11:00:22.952Z",
          "destination": "532a1698-0f25-4198-af15-be7dd79fa75f",
          "isFavorite": true,
          "offers": [
            "10862ab3-f630-4fd1-ba7b-03a1ecb3b236",
            "4a438d61-af1c-479d-951f-612cfbc7da33"
          ],
          "type": "bus"
        },
        {
          "id": "1c908943-8e00-48ad-9b19-f92eff35feae",
          "basePrice": 1366,
          "dateFrom": "2027-03-31T11:00:22.952Z",
          "dateTo": "2027-04-01T22:00:22.952Z",
          "destination": "799a1d5a-b2f9-4451-b066-b4e0a38777c8",
          "isFavorite": false,
          "offers": [
            "54be7b0a-255a-43a2-a267-6a9d522b9150"
          ],
          "type": "check-in"
        },
        {
          "id": "6f7a30d8-8d18-4618-b32f-b1e81826b0ed",
          "basePrice": 2921,
          "dateFrom": "2027-04-01T22:00:22.952Z",
          "dateTo": "2027-04-02T14:00:22.952Z",
          "destination": "532a1698-0f25-4198-af15-be7dd79fa75f",
          "isFavorite": false,
          "offers": [],
          "type": "check-in"
        },
        {
          "id": "78367035-6415-4e4a-b866-9262317c399a",
          "basePrice": 5455,
          "dateFrom": "2027-04-02T14:00:22.952Z",
          "dateTo": "2027-04-02T22:00:22.952Z",
          "destination": "71ac05ee-1fbf-47b5-a982-605bf344dfbf",
          "isFavorite": false,
          "offers": [
            "c79f6af9-402e-422d-b1d6-ce51251fd6a8",
            "043e8d63-64ad-4642-82ab-6b7ba5f2eefa"
          ],
          "type": "train"
        },
        {
          "id": "f69a518c-789e-4ad8-8c7d-31a1129f8a12",
          "basePrice": 4583,
          "dateFrom": "2027-04-02T22:00:22.952Z",
          "dateTo": "2027-04-03T23:00:22.952Z",
          "destination": "bf22de7d-069b-4806-80bf-07800007224f",
          "isFavorite": true,
          "offers": [
            "10862ab3-f630-4fd1-ba7b-03a1ecb3b236",
            "4a438d61-af1c-479d-951f-612cfbc7da33"
          ],
          "type": "bus"
        },
        {
          "id": "fbc4bfe3-80ed-4a07-acf3-ee62be61f53e",
          "basePrice": 9916,
          "dateFrom": "2027-04-03T23:00:22.952Z",
          "dateTo": "2027-04-05T22:00:22.952Z",
          "destination": "690d79cf-6ab9-4dd2-b8f1-f6d18b22d03e",
          "isFavorite": false,
          "offers": [
            "6fa6f4f3-bb9f-47a1-bc74-7fb05acdd1be",
            "f32be5ed-5657-44bf-8c46-2cee8028129b",
            "3788db1e-b61e-4bc8-b1fe-cb3c17a2efd9",
            "7d081f7a-4e92-445d-88a6-d04721125b7e",
            "b643c171-e785-481f-96b8-686fbfe3df3e"
          ],
          "type": "ship"
        },
        {
          "id": "fd49c4f0-6d0b-4209-b8e9-58067d36d697",
          "basePrice": 9523,
          "dateFrom": "2027-04-05T22:00:22.952Z",
          "dateTo": "2027-04-07T10:00:22.952Z",
          "destination": "71ac05ee-1fbf-47b5-a982-605bf344dfbf",
          "isFavorite": true,
          "offers": [
            "3284d090-d08f-4186-9001-1be84d63cff0",
            "a6ac7c3f-94cd-4f4a-b9cd-c7f31cc1d12f"
          ],
          "type": "flight"
        },
        {
          "id": "ac86b357-c7a6-4a83-9e45-34405c0b17d0",
          "basePrice": 4936,
          "dateFrom": "2027-04-07T10:00:22.952Z",
          "dateTo": "2027-04-08T01:00:22.952Z",
          "destination": "bf22de7d-069b-4806-80bf-07800007224f",
          "isFavorite": true,
          "offers": [
            "1863a1d3-70d5-4b40-a5b8-b0905b9a399b",
            "9228a04b-43c1-4dd2-8da8-7d338251b054"
          ],
          "type": "restaurant"
        },
        {
          "id": "b6993d60-b908-4449-9569-9534ba2e15ab",
          "basePrice": 9443,
          "dateFrom": "2027-04-08T01:00:22.952Z",
          "dateTo": "2027-04-08T07:00:22.952Z",
          "destination": "799a1d5a-b2f9-4451-b066-b4e0a38777c8",
          "isFavorite": false,
          "offers": [
            "5259a48b-db26-4d39-b66a-7d72988f495f",
            "a4c4bc85-06fd-4b1f-a2ea-fb2dd47f1c83",
            "c7f9a770-c4dd-4e67-abe0-d98cd22c0d33",
            "3284d090-d08f-4186-9001-1be84d63cff0",
            "a6ac7c3f-94cd-4f4a-b9cd-c7f31cc1d12f"
          ],
          "type": "flight"
        },
        {
          "id": "e24dcd0e-0921-4cb5-96e5-4d8d52c97e8e",
          "basePrice": 3272,
          "dateFrom": "2027-04-08T07:00:22.952Z",
          "dateTo": "2027-04-10T07:00:22.952Z",
          "destination": "71ac05ee-1fbf-47b5-a982-605bf344dfbf",
          "isFavorite": true,
          "offers": [
            "02c36ee0-ad63-4e14-bf7b-7e0d648c6595",
            "54be7b0a-255a-43a2-a267-6a9d522b9150"
          ],
          "type": "check-in"
        },
        {
          "id": "c17a4e0b-c8f7-457a-a807-43e614a8535e",
          "basePrice": 7673,
          "dateFrom": "2027-04-10T07:00:22.952Z",
          "dateTo": "2027-04-11T19:00:22.952Z",
          "destination": "71ac05ee-1fbf-47b5-a982-605bf344dfbf",
          "isFavorite": true,
          "offers": [
            "10862ab3-f630-4fd1-ba7b-03a1ecb3b236",
            "4a438d61-af1c-479d-951f-612cfbc7da33"
          ],
          "type": "bus"
        }
];

function getRandomPoint(){
      return {
    id: nanoid(),
    ...getRandomArrayElement(mockPoints)
  };
}

export {getRandomPoint};

