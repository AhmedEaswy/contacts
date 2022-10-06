import Client from '../database'
import Contacts from "../controllers/contacts";

export type Contact = {
    id?: string
    name: string
    phone: string,
    email: string,
}

export class ContactsStore {
    async index(): Promise<Contact[]> {
        try {
            const conn = await Client.connect()
            const sql = 'SELECT * FROM contacts'
            const result = await conn.query(sql)
            conn.release()
            return result.rows
        } catch (err) {
            throw new Error(`Can not connect to contacts ${err}`)
        }
    }

    async show(id: string): Promise<Contact> {
        try {
            const sql = 'SELECT * FROM contacts WHERE id=($1)'
            const conn = await Client.connect()
            const result = await conn.query(sql, [id])
            conn.release()
            return result.rows[0]
        } catch (err) {
            throw new Error(`Can not show to contacts on id: ${id} ${err}`)
        }
    }

    async create(contact: Contact): Promise<Contact> {
        try {
            const sql =
                'INSERT INTO contacts (name, phone, email) VALUES($1, $2, $3) RETURNING *'
            const conn = await Client.connect()
            const result = await conn.query(sql, [
                contact.name,
                contact.phone,
                contact.email,
            ])

            conn.release()
            return result.rows[0]
        } catch (err) {
            throw new Error(
                `Can not create to contacts on id: ${contact} ${err}`
            )
        }
    }

    async update(contact: Contact): Promise<Contact> {
        try {
            const sql =
                `UPDATE contacts SET name = $1, price = $2, updated_at = $3 WHERE id = ($4);`
            const conn = await Client.connect()
            const result = await conn.query(sql, [
                contact.name,
                contact.phone,
                contact.email,
                contact.id,
            ])
            conn.release()
            return result.rows[0]
        } catch (err) {
            throw new Error(
                `Can not update to contacts on id: ${contact} ${err}`
            )
        }
    }

    async delete(id: string): Promise<Contact> {
        try {
            const sql = 'DELETE FROM contacts WHERE id=($1)'
            const conn = await Client.connect()
            const result = await conn.query(sql, [id])
            conn.release()
            return result.rows[0]
        } catch (err) {
            throw new Error(`Can not delete to contacts on id: ${id} ${err}`)
        }
    }
}
