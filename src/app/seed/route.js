// src/app/seed/route.js
import { config } from "dotenv";
config(); // Load environment variables

import { db } from "@vercel/postgres";

const seedNotes = async () => {
  try {
    // Create the notes table if it doesn't exist
    await db.query(`
      CREATE TABLE IF NOT EXISTS notes (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        body TEXT NOT NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Insert seed data into the notes table
    await db.query(`
      INSERT INTO notes (title, body) VALUES 
      ('First Note', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit molestias eius labore accusantium error, eligendi velit dolores illo laudantium vero laboriosam voluptas unde aliquid harum eaque dolore ab cum tempora.
    Vero explicabo quasi optio, earum eaque quia, sed vel beatae perspiciatis voluptates voluptatem officia, hic iure ipsum iste. Ab quisquam eveniet aperiam voluptas. Porro sint asperiores voluptatem provident quia quam.
    Ipsam tenetur, officiis inventore autem quae explicabo debitis alias quos? Sint amet sapiente repellat rerum pariatur? Totam exercitationem iste voluptatem? Reprehenderit ratione doloremque libero accusamus, tenetur fugiat distinctio! Ipsum, sint?
    Molestias recusandae rem perferendis vel ut commodi quidem nemo libero illum suscipit saepe animi tempora asperiores et error consectetur dolorum itaque nobis, in temporibus. Asperiores commodi dicta eligendi odio ut?
    Recusandae repellat unde, reiciendis, eveniet tempora id illo necessitatibus voluptas temporibus dolores fuga architecto. Perspiciatis mollitia totam corrupti esse placeat iste at! Culpa sint doloribus possimus ut sit illum veritatis!
    Delectus nobis, maxime repellat atque optio accusamus enim laborum cum, ex dicta nostrum vitae. Exercitationem at dolor sed ab deserunt nostrum quisquam. Assumenda ex eos dolores! Quasi excepturi quaerat ad!
    Hic maxime consequuntur eaque reprehenderit quae quisquam eligendi ex, a illo quia non quidem recusandae inventore pariatur, amet vero sequi! Qui perferendis dolore distinctio eveniet pariatur quod explicabo. Facilis, consequatur.
    Pariatur, consectetur! Ex minus facere quidem unde. Voluptates, veniam accusantium quae asperiores vero velit porro rerum quia possimus dolorum tempore earum aut officia quidem iusto tenetur ipsum eos. Dolorem, neque.
    Maiores commodi iusto quam pariatur mollitia quibusdam delectus quisquam sint dolorem nam, illum similique deleniti at nulla tempora iste impedit velit, quis soluta accusantium illo ducimus eum molestias quidem! Explicabo.
    Magni consectetur aliquid, architecto ipsam et nihil unde deleniti eius vero, consequatur eveniet dignissimos ullam repellat! Aliquam modi, accusamus saepe asperiores nulla, non dolore ut ipsa quasi assumenda pariatur fugit!'),
      ('Second Note', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit molestias eius labore accusantium error, eligendi velit dolores illo laudantium vero laboriosam voluptas unde aliquid harum eaque dolore ab cum tempora.
    Vero explicabo quasi optio, earum eaque quia, sed vel beatae perspiciatis voluptates voluptatem officia, hic iure ipsum iste. Ab quisquam eveniet aperiam voluptas. Porro sint asperiores voluptatem provident quia quam.
    Ipsam tenetur, officiis inventore autem quae explicabo debitis alias quos? Sint amet sapiente repellat rerum pariatur? Totam exercitationem iste voluptatem? Reprehenderit ratione doloremque libero accusamus, tenetur fugiat distinctio! Ipsum, sint?
    Molestias recusandae rem perferendis vel ut commodi quidem nemo libero illum suscipit saepe animi tempora asperiores et error consectetur dolorum itaque nobis, in temporibus. Asperiores commodi dicta eligendi odio ut?
    Recusandae repellat unde, reiciendis, eveniet tempora id illo necessitatibus voluptas temporibus dolores fuga architecto. Perspiciatis mollitia totam corrupti esse placeat iste at! Culpa sint doloribus possimus ut sit illum veritatis!
    Delectus nobis, maxime repellat atque optio accusamus enim laborum cum, ex dicta nostrum vitae. Exercitationem at dolor sed ab deserunt nostrum quisquam. Assumenda ex eos dolores! Quasi excepturi quaerat ad!
    Hic maxime consequuntur eaque reprehenderit quae quisquam eligendi ex, a illo quia non quidem recusandae inventore pariatur, amet vero sequi! Qui perferendis dolore distinctio eveniet pariatur quod explicabo. Facilis, consequatur.
    Pariatur, consectetur! Ex minus facere quidem unde. Voluptates, veniam accusantium quae asperiores vero velit porro rerum quia possimus dolorum tempore earum aut officia quidem iusto tenetur ipsum eos. Dolorem, neque.
    Maiores commodi iusto quam pariatur mollitia quibusdam delectus quisquam sint dolorem nam, illum similique deleniti at nulla tempora iste impedit velit, quis soluta accusantium illo ducimus eum molestias quidem! Explicabo.
    Magni consectetur aliquid, architecto ipsam et nihil unde deleniti eius vero, consequatur eveniet dignissimos ullam repellat! Aliquam modi, accusamus saepe asperiores nulla, non dolore ut ipsa quasi assumenda pariatur fugit!.'),
      ('Third Note', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit molestias eius labore accusantium error, eligendi velit dolores illo laudantium vero laboriosam voluptas unde aliquid harum eaque dolore ab cum tempora.
    Vero explicabo quasi optio, earum eaque quia, sed vel beatae perspiciatis voluptates voluptatem officia, hic iure ipsum iste. Ab quisquam eveniet aperiam voluptas. Porro sint asperiores voluptatem provident quia quam.
    Ipsam tenetur, officiis inventore autem quae explicabo debitis alias quos? Sint amet sapiente repellat rerum pariatur? Totam exercitationem iste voluptatem? Reprehenderit ratione doloremque libero accusamus, tenetur fugiat distinctio! Ipsum, sint?
    Molestias recusandae rem perferendis vel ut commodi quidem nemo libero illum suscipit saepe animi tempora asperiores et error consectetur dolorum itaque nobis, in temporibus. Asperiores commodi dicta eligendi odio ut?
    Recusandae repellat unde, reiciendis, eveniet tempora id illo necessitatibus voluptas temporibus dolores fuga architecto. Perspiciatis mollitia totam corrupti esse placeat iste at! Culpa sint doloribus possimus ut sit illum veritatis!
    Delectus nobis, maxime repellat atque optio accusamus enim laborum cum, ex dicta nostrum vitae. Exercitationem at dolor sed ab deserunt nostrum quisquam. Assumenda ex eos dolores! Quasi excepturi quaerat ad!
    Hic maxime consequuntur eaque reprehenderit quae quisquam eligendi ex, a illo quia non quidem recusandae inventore pariatur, amet vero sequi! Qui perferendis dolore distinctio eveniet pariatur quod explicabo. Facilis, consequatur.
    Pariatur, consectetur! Ex minus facere quidem unde. Voluptates, veniam accusantium quae asperiores vero velit porro rerum quia possimus dolorum tempore earum aut officia quidem iusto tenetur ipsum eos. Dolorem, neque.
    Maiores commodi iusto quam pariatur mollitia quibusdam delectus quisquam sint dolorem nam, illum similique deleniti at nulla tempora iste impedit velit, quis soluta accusantium illo ducimus eum molestias quidem! Explicabo.
    Magni consectetur aliquid, architecto ipsam et nihil unde deleniti eius vero, consequatur eveniet dignissimos ullam repellat! Aliquam modi, accusamus saepe asperiores nulla, non dolore ut ipsa quasi assumenda pariatur fugit!'),
          ('Fourth Note', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit molestias eius labore accusantium error, eligendi velit dolores illo laudantium vero laboriosam voluptas unde aliquid harum eaque dolore ab cum tempora.
    Vero explicabo quasi optio, earum eaque quia, sed vel beatae perspiciatis voluptates voluptatem officia, hic iure ipsum iste. Ab quisquam eveniet aperiam voluptas. Porro sint asperiores voluptatem provident quia quam.
    Ipsam tenetur, officiis inventore autem quae explicabo debitis alias quos? Sint amet sapiente repellat rerum pariatur? Totam exercitationem iste voluptatem? Reprehenderit ratione doloremque libero accusamus, tenetur fugiat distinctio! Ipsum, sint?
    Molestias recusandae rem perferendis vel ut commodi quidem nemo libero illum suscipit saepe animi tempora asperiores et error consectetur dolorum itaque nobis, in temporibus. Asperiores commodi dicta eligendi odio ut?
    Recusandae repellat unde, reiciendis, eveniet tempora id illo necessitatibus voluptas temporibus dolores fuga architecto. Perspiciatis mollitia totam corrupti esse placeat iste at! Culpa sint doloribus possimus ut sit illum veritatis!
    Delectus nobis, maxime repellat atque optio accusamus enim laborum cum, ex dicta nostrum vitae. Exercitationem at dolor sed ab deserunt nostrum quisquam. Assumenda ex eos dolores! Quasi excepturi quaerat ad!
    Hic maxime consequuntur eaque reprehenderit quae quisquam eligendi ex, a illo quia non quidem recusandae inventore pariatur, amet vero sequi! Qui perferendis dolore distinctio eveniet pariatur quod explicabo. Facilis, consequatur.
    Pariatur, consectetur! Ex minus facere quidem unde. Voluptates, veniam accusantium quae asperiores vero velit porro rerum quia possimus dolorum tempore earum aut officia quidem iusto tenetur ipsum eos. Dolorem, neque.
    Maiores commodi iusto quam pariatur mollitia quibusdam delectus quisquam sint dolorem nam, illum similique deleniti at nulla tempora iste impedit velit, quis soluta accusantium illo ducimus eum molestias quidem! Explicabo.
    Magni consectetur aliquid, architecto ipsam et nihil unde deleniti eius vero, consequatur eveniet dignissimos ullam repellat! Aliquam modi, accusamus saepe asperiores nulla, non dolore ut ipsa quasi assumenda pariatur fugit!.'),
          ('Fifth Note', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit molestias eius labore accusantium error, eligendi velit dolores illo laudantium vero laboriosam voluptas unde aliquid harum eaque dolore ab cum tempora.
    Vero explicabo quasi optio, earum eaque quia, sed vel beatae perspiciatis voluptates voluptatem officia, hic iure ipsum iste. Ab quisquam eveniet aperiam voluptas. Porro sint asperiores voluptatem provident quia quam.
    Ipsam tenetur, officiis inventore autem quae explicabo debitis alias quos? Sint amet sapiente repellat rerum pariatur? Totam exercitationem iste voluptatem? Reprehenderit ratione doloremque libero accusamus, tenetur fugiat distinctio! Ipsum, sint?
    Molestias recusandae rem perferendis vel ut commodi quidem nemo libero illum suscipit saepe animi tempora asperiores et error consectetur dolorum itaque nobis, in temporibus. Asperiores commodi dicta eligendi odio ut?
    Recusandae repellat unde, reiciendis, eveniet tempora id illo necessitatibus voluptas temporibus dolores fuga architecto. Perspiciatis mollitia totam corrupti esse placeat iste at! Culpa sint doloribus possimus ut sit illum veritatis!
    Delectus nobis, maxime repellat atque optio accusamus enim laborum cum, ex dicta nostrum vitae. Exercitationem at dolor sed ab deserunt nostrum quisquam. Assumenda ex eos dolores! Quasi excepturi quaerat ad!
    Hic maxime consequuntur eaque reprehenderit quae quisquam eligendi ex, a illo quia non quidem recusandae inventore pariatur, amet vero sequi! Qui perferendis dolore distinctio eveniet pariatur quod explicabo. Facilis, consequatur.
    Pariatur, consectetur! Ex minus facere quidem unde. Voluptates, veniam accusantium quae asperiores vero velit porro rerum quia possimus dolorum tempore earum aut officia quidem iusto tenetur ipsum eos. Dolorem, neque.
    Maiores commodi iusto quam pariatur mollitia quibusdam delectus quisquam sint dolorem nam, illum similique deleniti at nulla tempora iste impedit velit, quis soluta accusantium illo ducimus eum molestias quidem! Explicabo.
    Magni consectetur aliquid, architecto ipsam et nihil unde deleniti eius vero, consequatur eveniet dignissimos ullam repellat! Aliquam modi, accusamus saepe asperiores nulla, non dolore ut ipsa quasi assumenda pariatur fugit!.'),
          ('Sixth Note', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit molestias eius labore accusantium error, eligendi velit dolores illo laudantium vero laboriosam voluptas unde aliquid harum eaque dolore ab cum tempora.
    Vero explicabo quasi optio, earum eaque quia, sed vel beatae perspiciatis voluptates voluptatem officia, hic iure ipsum iste. Ab quisquam eveniet aperiam voluptas. Porro sint asperiores voluptatem provident quia quam.
    Ipsam tenetur, officiis inventore autem quae explicabo debitis alias quos? Sint amet sapiente repellat rerum pariatur? Totam exercitationem iste voluptatem? Reprehenderit ratione doloremque libero accusamus, tenetur fugiat distinctio! Ipsum, sint?
    Molestias recusandae rem perferendis vel ut commodi quidem nemo libero illum suscipit saepe animi tempora asperiores et error consectetur dolorum itaque nobis, in temporibus. Asperiores commodi dicta eligendi odio ut?
    Recusandae repellat unde, reiciendis, eveniet tempora id illo necessitatibus voluptas temporibus dolores fuga architecto. Perspiciatis mollitia totam corrupti esse placeat iste at! Culpa sint doloribus possimus ut sit illum veritatis!
    Delectus nobis, maxime repellat atque optio accusamus enim laborum cum, ex dicta nostrum vitae. Exercitationem at dolor sed ab deserunt nostrum quisquam. Assumenda ex eos dolores! Quasi excepturi quaerat ad!
    Hic maxime consequuntur eaque reprehenderit quae quisquam eligendi ex, a illo quia non quidem recusandae inventore pariatur, amet vero sequi! Qui perferendis dolore distinctio eveniet pariatur quod explicabo. Facilis, consequatur.
    Pariatur, consectetur! Ex minus facere quidem unde. Voluptates, veniam accusantium quae asperiores vero velit porro rerum quia possimus dolorum tempore earum aut officia quidem iusto tenetur ipsum eos. Dolorem, neque.
    Maiores commodi iusto quam pariatur mollitia quibusdam delectus quisquam sint dolorem nam, illum similique deleniti at nulla tempora iste impedit velit, quis soluta accusantium illo ducimus eum molestias quidem! Explicabo.
    Magni consectetur aliquid, architecto ipsam et nihil unde deleniti eius vero, consequatur eveniet dignissimos ullam repellat! Aliquam modi, accusamus saepe asperiores nulla, non dolore ut ipsa quasi assumenda pariatur fugit!.'),
    
    ;
    `);

    console.log("Table creation and seeding completed successfully.");
  } catch (err) {
    console.error("Seeding failed:", err);
  } finally {
    // Note: Closing the connection is not necessary for @vercel/postgres
    // but you can use `await db.end();` if needed
  }
};

seedNotes();
