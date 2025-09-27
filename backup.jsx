// import React from "react";

// export default function backup() {
//   return (
//     <div className="bg-white dark:bg-suface-dark border border-slate-200 dark:border-slate-800 mt-10 p-5 rounded-lg">
//       <div className="flex items-center gap-3 flex-wrap justify-between">
//         <Input
//           value={query.search}
//           onChange={e => {
//             setQuery(prev => ({ ...prev, search: e.target.value }));
//           }}
//           className="max-w-100"
//           type="text"
//           placeholder="search product by title , des"
//         />

//         <div className="flex items-center gap-3">
//           <p>rows per page :</p>
//           <Select
//             value={query.pagination.perPages}
//             onValueChange={value => {
//               setQuery(prev => ({ ...prev, pagination: { ...prev.pagination, perPages: Number(value) } }));
//             }}
//             id="rows-per-page">
//             <SelectTrigger className="w-auto">
//               <SelectValue placeholder="8" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectGroup>
//                 <SelectLabel>rows</SelectLabel>
//                 <SelectItem value={5}>5</SelectItem>
//                 <SelectItem value={10}>10</SelectItem>
//                 <SelectItem value={15}>15</SelectItem>
//                 <SelectItem value={20}>20</SelectItem>
//                 <SelectItem value={25}>25</SelectItem>
//                 <SelectItem value={30}>30</SelectItem>
//               </SelectGroup>
//             </SelectContent>
//           </Select>
//         </div>
//       </div>

//       {/* table */}
//       {processedProducts.length ? (
//         <>
//           <div className="overflow-x-auto">
//             {/* products table */}
//             <table className="bg-white dark:bg-app-dark text-nowrap w-full mt-5 text-center border-separate border-spacing-0 rounded-lg overflow-hidden">
//               <thead>
//                 <tr className="*:border *:border-slate-200 dark:*:border-slate-700 *:uppercase *:p-3 bg-slate-50 dark:bg-slate-900">
//                   <th>id</th>
//                   <th>thumbnail</th>
//                   <th>title</th>
//                   <th>category</th>
//                   <th>brand</th>
//                   <th>price</th>
//                   <th>discount</th>
//                   <th>stock</th>
//                   <th>rate</th>
//                   <th></th>
//                 </tr>
//               </thead>
//               <tbody className="*:even:bg-slate-50 dark:*:even:bg-slate-900 *:transition-colors *:hover:bg-slate-100 dark:*:hover:bg-slate-800">
//                 {processedProducts.map(p => (
//                   <tr key={p.id} className="*:border *:p-2 *:border-slate-200 dark:*:border-slate-700 ">
//                     <td>{p.id}</td>
//                     <td>
//                       <div className="size-12  overflow-hidden mx-auto">
//                         <FallbackImage src={`/${p.mainImage}`} alt="avatar image" className="size-full object-cover" />
//                       </div>
//                     </td>
//                     <td>{p.title}</td>
//                     <td>{p.category}</td>
//                     <td>{p.brand}</td>
//                     <td>${p.price.toLocaleString()}</td>
//                     <td>{p.discount}%</td>
//                     <td>{p.stock}</td>
//                     <td>
//                       <div className="flex items-center justify-center">
//                         {Array.from({ length: p.rate }, (_, i) => (
//                           <Star key={i} className="size-4 text-yellow-500 fill-yellow-500" />
//                         ))}

//                         {Array.from({ length: 5 - p.rate }, (_, i) => (
//                           <Star key={i} className="size-4 text-yellow-500 " />
//                         ))}
//                       </div>
//                     </td>
//                     <td>
//                       <DropdownMenu>
//                         <DropdownMenuTrigger asChild>

//                           <button>
//                             <EllipsisVertical />
//                           </button>
//                         </DropdownMenuTrigger>
//                         <DropdownMenuContent className="w-56" align="start">
//                           <DropdownMenuLabel>Actions</DropdownMenuLabel>

//                           <DropdownMenuItem
//                             onClick={() => {
//                               setShowViewModal(true);
//                               setSelectedProduct(p);
//                             }}>
//                             <Eye className="size-4" />
//                             <span>view</span>
//                           </DropdownMenuItem>
//                           <DropdownMenuItem
//                             onClick={() => {
//                               setShowEditModal(true);
//                               setSelectedProduct(p);
//                             }}>
//                             <Pencil className="size-4" />
//                             <span>edit</span>
//                           </DropdownMenuItem>
//                           <DropdownMenuItem
//                             onClick={() => {
//                               setShowDeleteProductModal(true);
//                               setSelectedProduct(p);
//                             }}
//                             className="hover:bg-red-100! text-red-500 hover:text-red-500!">
//                             <Trash className="size-4" />
//                             <span>delete</span>
//                           </DropdownMenuItem>
//                         </DropdownMenuContent>
//                       </DropdownMenu>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//           <div className="flex items-end justify-between flex-wrap-reverse mt-5 gap-5">

//             <CustomPagination currentPage={query.pagination.page} pages={pages} onChangePage={changeCurrentPage} onPrevPage={prevPage} onNextPage={nextPage} />

//             <span className="capitalize text-lg text-slate-400">total products : {products.length}</span>
//           </div>
//         </>
//       ) : (
//         <div className="pt-4 pb-12 px-4 border border-slate-200 rounded-lg mt-5 flex flex-col items-center">
//           <FileSearchIllustration className="h-100" />
//           <h4 className="text-2xl capitalize font-semibold">no products found</h4>
//         </div>
//       )}
//     </div>
//   );
// }
