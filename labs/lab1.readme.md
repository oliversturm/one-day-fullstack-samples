# One Day Fullstack Workshop -- Demo Block 1

This project state is prepared for you to check out the details of the previous presentation block.

## Instructions

### Preparations -- only needed once per workshop

Clone the sample and lab repository to your local machine (you may have already done this):

```shell
git clone https://github.com/oliversturm/one-day-fullstack-samples.git
```

Install all dependencies:

```shell
npm install
```

### Install the MongoDB Shell -- only needed once per workshop

To examine the content of the demo database during the practice labs, the use of the tool `mongosh` is recommended. Please install it on your machine using an `npm` command:

```shell
npm install -g mongosh
```

### Consider using a local MongoDB instance -- only needed once per workshop

By default, samples and lab projects are configured to use a shared demo database in the cloud. Performance may be limited and data may overlap, so you need to make sure you modify all sample instructions to use your unique test IDs and values.

Alternatively, you can use a local MongoDB instance. Of course this can be installed natively on your machine, but you can also use a temporary Docker container. Assuming you have the Docker command line tools available:

```shell
docker run -p 27017:27017 --rm --name mongo mongo:latest
```

This repository contains extra start configurations for the "local MongoDB" scenario. The config files include the string `localmongo`, and so do the `package.json` script names. For example, these are the two start commands for the Block 1 Demo project:

```shell
npm run start:block
npm run start:block1:localmongo
```

Finally, to connect to your local MongoDB instance with `mongosh`, the command is also different. For comparison:

```shell
# Using shared instance, as below:
mongosh "mongodb+srv://cluster0.mejvj0u.mongodb.net/events" --apiVersion 1 --username <user>

# Using local MongoDB instance:
mongosh "mongodb://127.0.0.1/events" --apiVersion 1
```

Of course you can use the same techniques to make the samples use any other MongoDB instance. In that case, please copy and edit config files as required.

### Configure MongoDB authentication -- only needed once per workshop

**Note** this step is not required of you use the "local MongoDB" setup described above.

Create the file `.user-auth.json` in the root folder of the repository and edit it to contain the following structure. 

**Replace `<user>` and `<password>` with the correct values that were passed out for today's workshop.**

```json
{
  "MONGODB_USER": "<user>",
  "MONGODB_PWD": "<password>"
}
```

### Observe the behavior of the sample application

- Check the service configuration in `pm2.block1.config.cjs`. You can see the services of the current project state in this file, and the environment variables used to configure them.

- Run the application

```shell
npm run start:block1
```

- Check the logs

```shell
npm run pm2 -- logs
```

- Work with the HTTP APIs.

```shell
# create customer
npm run http POST http://127.0.0.1:3001/api/command aggregateName:customer,  command:CREATE, 'payload:{name:"Bill", location:"London"},' aggregateId:customer-1
# place order
npm run http POST http://127.0.0.1:3001/api/command aggregateName:order,  command:CREATE, 'payload:{customerId:customer-1, text:"First order", value:13.99},' aggregateId:order-1
# check out public read-model content
npm run http GET http://127.0.0.1:3003/query/overview/all
npm run http GET http://127.0.0.1:3005/query/overview/all
npm run http POST http://127.0.0.1:3005/query/overview/customerById id:customer-1
```

- Check what happens in MongoDB

```shell
mongosh "mongodb+srv://cluster0.mejvj0u.mongodb.net/events" --apiVersion 1 --username <user>
Enter password: <password>
...
Atlas ... [primary] events> db.events.find()
[ ... ]
Atlas ... [primary] events> use readmodel-customers
switched to db readmodel-customers
Atlas ... [primary] readmodel-customers> show collections
editing
overview
readmodel.state
Atlas ... [primary] readmodel-customers> db.overview.find()
[ ... ]
Atlas ... [primary] readmodel-customers> db.readmodel.state.find()
[ ... ]
```

- Stop the application

```shell
npm run pm2 -- stop all
```

> Other pm2 commands are available if required

```shell
# See a specific log
npm run pm2 -- logs --lines 100 <servicename>

# See running services
npm run pm2 -- list

# Restart a service
npm run pm2 -- restart <servicename>

# Get help
npm run pm2 -- --help
npm run pm2 -- logs --help
```

> Stop pm2 and delete pm2 state info when changing projects during the day. pm2 records processes and their names, and may run the wrong ones later in the day if you forget to do this!

```shell
npm run pm2 -- kill
rm -rf ~/.pm2
```

## Lab 1 -- Task

The source code of this lab starting point is in `labs/lab1/start`. You can find the complete lab in `labs/lab1/final`. Note that both project states can be started using directly using npm commands. Don't forget to stop and clean up previous versions when you change projects!

```shell
npm run pm2-stop
rm -rf ~/.pm2

npm run start:lab1:start
npm run pm2-stop
rm -rf ~/.pm2

npm run start:lab1:final
...
```

In the current state of the project, Customers can be updated, but the results are not reflected correctly by the readmodel `orders/overview`.

```shell
# update customer name
npm run http POST http://127.0.0.1:3001/api/command aggregateName:customer, command:UPDATE, 'payload:{name:"New Name"},' aggregateId:customer-1
# check that customers read-model has updated (should work)
npm run http GET http://127.0.0.1:3003/query/overview/all
# check that orders read-model has updated (does not work at this time)
npm run http GET http://127.0.0.1:3005/query/overview/all
```

Your job: add handling of the event `CUSTOMER_UPDATED` to the readmodel `orders/overview`. (Hint: two storage updates need to be combined!)
