# Eclipse Music Group site

A Keystone.js-built marketing site for Eclipse Music Group.

KeystoneJS Docs: https://v4.keystonejs.com/documentation/

This site uses **_VERSION 4_**. V5 saw major changes so be sure to work in accordance with V4.

This site is built in MVC architecture. Models pull data from Mongo in JSON and use routes/views
to populate the frontend. Use Keystone ('_site_url_/keystone') to access the database, or bash in
and run mongo. db name is eclipse, runs on a web socket, on port 27017.
Frontend templates are in pug. Run gulp to compile SASS.

### Stack:

- SASS
- Pug
- Node.js
  -> Express.js
  -> Keystone.js
- MongoDB

### Dev process

Unfortunately, this site was built in 2017, which means the versions of gulp, keystone, etc. are all woefully out-of-date. It still works great in the wild, but you may encounter compatability issues trying to install it six years after it was built...

### Notes on Keystone.js:

- Dev only possible with network connection.
- CMS'd images are sourced REMOTELY w/ Cloudinary
- To add something to the CMS, simply register and edit the data model in /models

### Google Mailer:

You need this to send site emails. Creds are with Anne and Kurt at Eclipse.

### Hosting:

Currently hosted in the OHIO REGION of AWS.
WHEN FTP-ING: Make sure the '.env' file is synced up. The error 'Cloudinary config not set' occurs when this file is missing.

Pub DNS: -> Does NOT work without 'www'
http://www.eclipsemusicgrp.com/

Home dir of site:
/home/ubuntu/site/

### Mongo notes

This site uses MongoDB locally on the AWS server, run through a web socket.
A FULL DATABASE BACKUP is in /etc/DB_BACKUP
run 'mongorestore --db eclipse ./path/to/backup/folder' to restore db to initial prod db.

### Contact Eclipse with questions:

2 Music Circle South, Suite 100A
Nashville TN, 37203
info@eclipsemusicgrp.com

Google Maps Embed Code (Non-paid API service)
embed?pb=!1m18!1m12!1m3!1d3221.6956326628706!2d-86.7923036847283!3d36.14962348008783!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8864668e77c037a7%3A0xd7e3797a4ff33e8f!2s2+Music+Cir+S+%23100A%2C+Nashville%2C+TN+37203!5e0!3m2!1sen!2sus!4v1540504935431
