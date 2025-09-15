import { Eye, Pencil, Trash, EllipsisVertical, Star } from "lucide-react";

import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  NumberInput,
  DropdownTrigger,
  Input,
  Button,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Table,
  Avatar,
  Pagination,
  Select,
  SelectItem,
} from "@heroui/react";

export default function Products() {
  return (
    <div className="min-h-screen bg-slate-100 p-5">
      <h2 className="text-2xl font-bold">Products</h2>

      {/* Products List & Table , Sorting , Filtering , ... */}
      <div className="mt-5">
        {/* top */}
        <div className="flex items-center justify-between">
          {/* left side */}
          <div>
            <Input
              type="search"
              label="search..."
              variant="bordered"
              classNames={{
                inputWrapper: ["bg-white"],
              }}
            />
          </div>

          {/* right side */}
          <div className="w-full">
            <Select className="max-w-xs" label="category filter">
              <SelectItem key="laptop">laptop</SelectItem>
              <SelectItem key="mobile">mobile</SelectItem>
              <SelectItem key="headphone">headphone</SelectItem>
              <SelectItem key="manitor">manitor</SelectItem>
            </Select>

            <Select className="max-w-xs" label="brand filter">
              <SelectItem key="asus">asus</SelectItem>
              <SelectItem key="lenevo">lenevo</SelectItem>
              <SelectItem key="apple">apple</SelectItem>
            </Select>
          </div>
        </div>
        {/* bottom */}
        <div className="mt-2 flex items-center justify-between">
          <p className="text-lg capitalize text-slate-400">total users : 20</p>
          <div>
            <NumberInput
              label="items per page:"
              variant="bordered"
              labelPlacement="outside-left"
              minValue={4}
              classNames={{
                inputWrapper: ["max-w-30"],
              }}
            />
          </div>
        </div>

        {/* table */}
        <Table isStriped className="mt-5">
          <TableHeader>
            <TableColumn>ID</TableColumn>
            <TableColumn>PRODUCT</TableColumn>
            <TableColumn>CATEGORY</TableColumn>
            <TableColumn>PRICE</TableColumn>
            <TableColumn>RATE</TableColumn>
            <TableColumn>STOCK</TableColumn>
            <TableColumn>CREATED</TableColumn>
            <TableColumn>ACTIONS</TableColumn>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>876234</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Avatar />
                  <span>mackbook pro</span>
                </div>
              </TableCell>
              <TableCell>laptop</TableCell>
              <TableCell>$79.99</TableCell>
              <TableCell>
                <div className="flex">
                  {Array.from({ length: 3 }, (_, i) => (
                    <Star key={i} size={16} fill="oklch(82.8% 0.189 84.429)" color="oklch(82.8% 0.189 84.429)" strokeWidth={2} />
                  ))}

                  {Array.from({ length: 2 }, (_, i) => (
                    <Star key={i} size={16} color="oklch(82.8% 0.189 84.429)" strokeWidth={2} />
                  ))}
                </div>
              </TableCell>
              <TableCell>23</TableCell>
              <TableCell>2025/10/13</TableCell>
              <TableCell>
                {/* dropdown for actions(CRUD) */}
                <Dropdown>
                  <DropdownTrigger>
                    <Button isIconOnly disableRipple className="bg-transparent">
                      <EllipsisVertical />
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu
                    aria-label="Static Actions"
                    onAction={key => {
                      console.log(key + " product");
                    }}>
                    <DropdownItem startContent={<Eye className="size-4" />} key="view">
                      View
                    </DropdownItem>
                    <DropdownItem startContent={<Pencil className="size-4" />} key="edit">
                      Edit
                    </DropdownItem>
                    <DropdownItem className="text-danger" color="danger" startContent={<Trash className="size-4" />} key="delete">
                      Delete
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell>876234</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Avatar />
                  <span>mackbook pro</span>
                </div>
              </TableCell>
              <TableCell>laptop</TableCell>
              <TableCell>$79.99</TableCell>
              <TableCell>
                <div className="flex">
                  {Array.from({ length: 3 }, (_, i) => (
                    <Star key={i} size={16} fill="oklch(82.8% 0.189 84.429)" color="oklch(82.8% 0.189 84.429)" strokeWidth={2} />
                  ))}

                  {Array.from({ length: 2 }, (_, i) => (
                    <Star key={i} size={16} color="oklch(82.8% 0.189 84.429)" strokeWidth={2} />
                  ))}
                </div>
              </TableCell>
              <TableCell>23</TableCell>
              <TableCell>2025/10/13</TableCell>
              <TableCell>
                {/* dropdown for actions(CRUD) */}
                <Dropdown>
                  <DropdownTrigger>
                    <Button isIconOnly disableRipple className="bg-transparent">
                      <EllipsisVertical />
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu
                    aria-label="Static Actions"
                    onAction={key => {
                      console.log(key + " product");
                    }}>
                    <DropdownItem startContent={<Eye className="size-4" />} key="view">
                      View
                    </DropdownItem>
                    <DropdownItem startContent={<Pencil className="size-4" />} key="edit">
                      Edit
                    </DropdownItem>
                    <DropdownItem className="text-danger" color="danger" startContent={<Trash className="size-4" />} key="delete">
                      Delete
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell>876234</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Avatar />
                  <span>mackbook pro</span>
                </div>
              </TableCell>
              <TableCell>laptop</TableCell>
              <TableCell>$79.99</TableCell>
              <TableCell>
                <div className="flex">
                  {Array.from({ length: 3 }, (_, i) => (
                    <Star key={i} size={16} fill="oklch(82.8% 0.189 84.429)" color="oklch(82.8% 0.189 84.429)" strokeWidth={2} />
                  ))}

                  {Array.from({ length: 2 }, (_, i) => (
                    <Star key={i} size={16} color="oklch(82.8% 0.189 84.429)" strokeWidth={2} />
                  ))}
                </div>
              </TableCell>
              <TableCell>23</TableCell>
              <TableCell>2025/10/13</TableCell>
              <TableCell>
                {/* dropdown for actions(CRUD) */}
                <Dropdown>
                  <DropdownTrigger>
                    <Button isIconOnly disableRipple className="bg-transparent">
                      <EllipsisVertical />
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu
                    aria-label="Static Actions"
                    onAction={key => {
                      console.log(key + " product");
                    }}>
                    <DropdownItem startContent={<Eye className="size-4" />} key="view">
                      View
                    </DropdownItem>
                    <DropdownItem startContent={<Pencil className="size-4" />} key="edit">
                      Edit
                    </DropdownItem>
                    <DropdownItem className="text-danger" color="danger" startContent={<Trash className="size-4" />} key="delete">
                      Delete
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell>876234</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Avatar />
                  <span>mackbook pro</span>
                </div>
              </TableCell>
              <TableCell>laptop</TableCell>
              <TableCell>$79.99</TableCell>
              <TableCell>
                <div className="flex">
                  {Array.from({ length: 3 }, (_, i) => (
                    <Star key={i} size={16} fill="oklch(82.8% 0.189 84.429)" color="oklch(82.8% 0.189 84.429)" strokeWidth={2} />
                  ))}

                  {Array.from({ length: 2 }, (_, i) => (
                    <Star key={i} size={16} color="oklch(82.8% 0.189 84.429)" strokeWidth={2} />
                  ))}
                </div>
              </TableCell>
              <TableCell>23</TableCell>
              <TableCell>2025/10/13</TableCell>
              <TableCell>
                {/* dropdown for actions(CRUD) */}
                <Dropdown>
                  <DropdownTrigger>
                    <Button isIconOnly disableRipple className="bg-transparent">
                      <EllipsisVertical />
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu
                    aria-label="Static Actions"
                    onAction={key => {
                      console.log(key + " product");
                    }}>
                    <DropdownItem startContent={<Eye className="size-4" />} key="view">
                      View
                    </DropdownItem>
                    <DropdownItem startContent={<Pencil className="size-4" />} key="edit">
                      Edit
                    </DropdownItem>
                    <DropdownItem className="text-danger" color="danger" startContent={<Trash className="size-4" />} key="delete">
                      Delete
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <Pagination
          className="mt-4"
          showControls
          initialPage={1}
          total={10}
          classNames={{
            item: ["bg-white", "hover:bg-slate-200!", "cursor-pointer"],
            prev: ["bg-white", "hover:bg-slate-200!", "cursor-pointer"],
            next: ["bg-white", "hover:bg-slate-200!", "cursor-pointer"],
            cursor: ["bg-slate-500"],
          }}
        />
      </div>
    </div>
  );
}

/* 

فیلترهای پرکاربرد توی داشبورد محصول

وضعیت موجودی (Stock Status)

همه محصولات

موجود

ناموجود

موجودی کم (مثلاً کمتر از ۱۰ عدد)

وضعیت انتشار (Publish Status)

فعال (نمایش در سایت)

پیش‌نویس

آرشیو

دسته‌بندی (Category)

موبایل، لپ‌تاپ، لوازم جانبی …

برند (Brand)

فیلتر بر اساس برند محصول

تخفیف‌دار بودن (Discounted)

فقط محصولاتی که تخفیف دارن

بازه قیمتی (Price Range)

انتخاب min/max قیمت

تاریخ ایجاد / آخرین تغییر (Date Created / Updated)

امروز، این هفته، این ماه

🔽 مرتب‌سازی‌های پرکاربرد

جدیدترین محصولات (Newest First)

بر اساس تاریخ ایجاد

قدیمی‌ترین محصولات (Oldest First)

گران‌ترین به ارزان‌ترین (Price High → Low)

ارزان‌ترین به گران‌ترین (Price Low → High)

بیشترین موجودی (Stock High → Low)

کمترین موجودی (Stock Low → High)

بیشترین فروش (Most Sold)

💡 نکته:
این فیلترها رو معمولاً بالای جدول محصولات (Table) می‌ذارن، به صورت Select یا Dropdown، و مرتب‌سازی رو به شکل Sort by منوی جدا یا روی ستون جدول (sortable columns) پیاده می‌کنن
*/
