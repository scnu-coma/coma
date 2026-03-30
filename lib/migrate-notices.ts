import fs from "fs";
import { join } from "path";
import matter from "gray-matter";
import pool from "./db";

const postsDirectory = join(process.cwd(), "_posts/_notice");

async function migrate() {
    const filenames = fs.readdirSync(postsDirectory);

    for (const filename of filenames) {
        if (!filename.endsWith(".md")) continue;

        const fullPath = join(postsDirectory, filename);
        const fileContents = fs.readFileSync(fullPath, "utf8");
        const { data, content } = matter(fileContents);

        const title = data.title || filename.replace(/\.md$/, "");
        const author_id = 1; // Default Admin ID

        try {
            await pool.query(
                "INSERT INTO notices (title, content, author_id, created_at) VALUES (?, ?, ?, ?)",
                [title, content, author_id, data.date || new Date()]
            );
            console.log(`Migrated: ${title}`);
        } catch (error) {
            console.error(`Failed to migrate ${title}:`, error);
        }
    }
    
    console.log("Migration finished.");
    process.exit(0);
}

migrate();
