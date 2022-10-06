import express, { Request, Response } from 'express';
import { Contact, ContactsStore } from "../models/contact";
const store = new ContactsStore();

const index = async (_req: Request, res: Response) => {
    try {
        const contacts = await store.index();
        res.status(200).json(contacts);
    } catch (err) {
        res.status(400).json({ error: `${err}` });
    }
}

const show = async (_req: Request, res: Response) => {
    try {
        const id: string = _req.params.id;
        const contact = await store.show(id)
        res.status(200).json(contact)
    } catch (err) {
        res.status(400).json({
            error: `${err}`
        })
    }
}

const create = async (_req: Request, res: Response) => {
    try {
        const contact: Contact = {
            name: _req.body.name,
            phone: _req.body.phone,
            email: _req.body.email,
        }
        const newContact = await store.create(contact)
        res.status(200).json({
            msg: `contact created successfully`,
            id: newContact.id
        })
    } catch (err) {
        console.log(err)
        res.status(400).json({
            error: err
        })
    }
}

const update = async (_req: Request, res: Response) => {
    try {
        const contact: Contact = {
            id: _req.params.id,
            name: _req.body.name,
            phone: _req.body.phone,
            email: _req.body.email,
        }
        await store.update(contact)
        res.json({
            msg: `Contact updated successfully`,
            id: contact.id
        })
    } catch (err) {
        console.log(err)
    }
}

const destroy = async (_req: Request, res: Response) => {
    try {
        await store.delete(_req.params.id)
        res.json({
            msg: `Contact ${_req.params.id} deleted`
        })
    } catch (err) {
        res.json({
            error: err
        })
    }
}

const contacts_routes = (app: express.Application) => {
    // contacts routes resources
    app.get('/contacts', index)
    app.get('/contacts/:id', show)
    app.post('/contacts', create)
    app.put('/contacts/:id', update)
    app.delete('/contacts/:id', destroy)
}

export default contacts_routes;
