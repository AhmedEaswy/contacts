import supertest from 'supertest'
import { Contact, ContactsStore } from '../models/contact';
// import express from "express";

// const app: express.Application = express()
import app from '../index'
const store = new ContactsStore()

// Testing Contact Modal
describe('Contact Model', async () => {
    const newContact: Contact = {
        id: '1',
        name: 'contact',
        phone: '0100000000',
        email: 'info@mail.com'
    }
    it('should Create Contact', async () => {
        const create_contact = await store.create(newContact);
        newContact.id = await create_contact.id;
        expect(create_contact).toBeDefined()
    })
    it('should Have Index Method', async () => {
        const contacts = await store.index()
        expect(contacts.length).toBeGreaterThan(0)
    })
    it('should Have Show Method', async () => {
        const contact = await store.show(<string>newContact.id)
        expect(contact).toBeDefined()
    })
    it('should Have Update Method', async () => {
        newContact.name = 'new contact'
        newContact.email = 'info@mail.com'
        newContact.phone = '010000000'
        const update_contact = await store.update(newContact)
        expect(update_contact).toBeDefined()
    })
})



describe("Contact API Tests", () => {
    const request = supertest(app);
    const contact = { id: undefined, name: "test", email: 'info@mail.com', phone: '0100000000' }


    let user = {
        id: undefined,
        name: 'Ahmed Eleaswy',
        email: 'elesawy325@gmail.com',
        phone: '123456789',
    };
    let token = '';


    // Register A New User If It Does Not Exist
    it("should create new user", async () => {
        const res = await request
            .post("/contacts")
            .send(user);
        expect(res.status).toBeTruthy()
        if (res.status === 200) {
            user.id = res.body.id
        }
    });

    // Create New Contact
    it("should create new contact", async () => {
        const res = await request
            .post("/contacts")
            .send(contact);
        expect(res.status).toBe(200);
        contact.id = res.body.id;
    });

    // Get List Of Contacts
    it("should get list of contacts", async () => {
        const res = await request
            .get("/contacts")
        expect(res.status).toBe(200);
        expect(res.body.length).toBeGreaterThanOrEqual(0);
    });

    // Get Contact Info
    it("should get contact info", async () => {
        const res = await request.get(`/contacts/${contact.id}`);
        expect(res.status).toBe(200);
        expect(res.body.id).toBe(contact.id);
    });

    // Update Created Contact
    it("should update contact info", async () => {
        contact.name = "new name";
        contact.email = 'info@mail.com';
        contact.phone = '010000000';
        const res = await request
            .put(`/contacts/${contact.id}`)
            .send(contact);
        expect(res.status).toBe(200);
    });

    // Delete Created Contact
    it("should delete contact", async () => {
        const res = await request
            .delete(`/contacts/${contact.id}`)
        expect(res.status).toBe(200);
    });

});
