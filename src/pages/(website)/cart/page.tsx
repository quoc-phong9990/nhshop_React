import useCart from '@/common/hooks/useCart'
import { Link } from 'lucide-react'
import { ChangeEvent } from 'react'

const CartPage = () => {
    const { data, mutate, handleQuantityChange, calculateTotal, isLoading, isError } = useCart()
    // if (isLoading) return <p>Loading...</p>
    if (isError) return <p>Error</p>

    return (
        <div className='container'>
            <table className='w-full'>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Tên sản phẩm</th>
                        <th>Giá</th>
                        <th>Số lượng</th>
                        <th>Tổng giá</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {data?.products.map((product: any, index: number) => {
                        return (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td className='border-2'>{product.name}</td>
                                <td className='border-2'>{product.price}</td>
                                <td className='border-2'>
                                    <input
                                        type='number'
                                        className='border-none rounded-md w-16 text-center'
                                        value={product.quantity}
                                        onChange={(e) =>
                                            handleQuantityChange(product.productId, e as ChangeEvent<HTMLInputElement>)
                                        }
                                        min={0}
                                    />
                                </td>
                                <td className='border-2'>{product.price * product.quantity}</td>
                                <td className='border-2'>
                                    <button
                                        className='py-2 px-4 bg-red-500 text-white rounded-sm'
                                        onClick={() =>
                                            mutate({
                                                action: 'REMOVE',
                                                productId: product.productId
                                            })
                                        }
                                    >
                                        Xóa
                                    </button>
                                </td>

                            </tr>
                        )
                    })}

                </tbody>

            </table>
            <a style={{ marginLeft: '84%', display: 'inline-block', marginTop: '10px', textDecoration: 'none', backgroundColor: '#007bff', color: '#fff', padding: '10px 20px', borderRadius: '5px' }} href="/order">Thanh toán</a>
            <p style={{ display: 'inline-block', marginLeft: '20px', fontSize: '18px', fontWeight: '500' }}> Total: ${calculateTotal()}</p>

        </div>
    )
}

export default CartPage
