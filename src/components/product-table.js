import Link from "next/link";

export default function ProductTable() {
  return (
    <div className="mr-20">
        <table >
            <thead>
                <tr>
                    <th>Product ID</th>
                    <th>Product Name</th>
                    <th>Price</th>
                    <th>Labels</th>
                    <th>Status</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>001</td>
                    <td>Sharky</td>
                    <td>$12.99</td>
                    <td>Bestselling</td>
                    <td>Published</td>
                    <td><Link href="/admin/product-edit" className="text-blue-600 font-bold underline">edit</Link></td>
                </tr>
                <tr>
                    <td>002</td>
                    <td>Octopus</td>
                    <td>$16.99</td>
                    <td>New Release</td>
                    <td>Published</td>
                    <td><Link href="/admin/product-edit" className="text-blue-600 font-bold underline">edit</Link></td>
                </tr>
                <tr>
                    <td>003</td>
                    <td>Assasino</td>
                    <td>$12.99</td>
                    <td></td>
                    <td>Draft</td>
                    <td><Link href="/admin/product-edit" className="text-blue-600 font-bold underline">edit</Link></td>
                </tr>
            </tbody>
        </table>
    </div>
  );
}
