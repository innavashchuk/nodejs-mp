import { Migration } from '@mikro-orm/migrations';

export class Migration20231012145917 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "product" ("id" varchar(255) not null, "title" varchar(255) not null, "description" varchar(255) not null, "price" int not null, constraint "product_pkey" primary key ("id"));');

    this.addSql('create table "user" ("id" varchar(255) not null, "name" varchar(255) not null, constraint "user_pkey" primary key ("id"));');

    this.addSql('create table "cart" ("id" varchar(255) not null, "user_id" varchar(255) not null, "is_deleted" boolean not null, constraint "cart_pkey" primary key ("id"));');

    this.addSql('create table "cart_item" ("id" varchar(255) not null, "product_id" varchar(255) not null, "count" int not null, "cart_id" varchar(255) not null, constraint "cart_item_pkey" primary key ("id"));');
    this.addSql('alter table "cart_item" add constraint "cart_item_product_id_unique" unique ("product_id");');

    this.addSql('create table "order" ("id" varchar(255) not null, "user_id" varchar(255) not null, "cart_id" varchar(255) not null, "items_id" varchar(255) not null, "payment_type" varchar(255) not null, "payment_address" varchar(255) not null, "payment_credit_card" varchar(255) not null, "delivery_type" varchar(255) not null, "delivery_address" varchar(255) not null, "comments" varchar(255) not null, "status" text check ("status" in (\'created\', \'completed\')) not null default \'created\', "total_price" int not null, constraint "order_pkey" primary key ("id"));');
    this.addSql('alter table "order" add constraint "order_cart_id_unique" unique ("cart_id");');

    this.addSql('alter table "cart" add constraint "cart_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;');

    this.addSql('alter table "cart_item" add constraint "cart_item_product_id_foreign" foreign key ("product_id") references "product" ("id") on update cascade;');
    this.addSql('alter table "cart_item" add constraint "cart_item_cart_id_foreign" foreign key ("cart_id") references "cart" ("id") on update cascade;');

    this.addSql('alter table "order" add constraint "order_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;');
    this.addSql('alter table "order" add constraint "order_cart_id_foreign" foreign key ("cart_id") references "cart" ("id") on update cascade;');
    this.addSql('alter table "order" add constraint "order_items_id_foreign" foreign key ("items_id") references "cart_item" ("id") on update cascade;');
  }

}
