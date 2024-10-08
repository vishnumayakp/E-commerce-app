import React, { useEffect, useState } from 'react'
import { FaSearch } from "react-icons/fa";
import { BsFillPlusCircleFill, BsNvidia } from "react-icons/bs";
import { deleteProductById, getProductById, getProducts } from '../../../Api/Connection';
import AddingProducts from '../AddProducts/AddingProducts';
import EditPro from '../EditProducts/EditPro';
import { useNavigate } from 'react-router-dom';

function TotalProducts({id}) {

  const [products,setProducts]=useState([])
  const navigate = useNavigate()
  const [isModal,setIsModal]=useState(false)
  const [editModal,setEditModal]=useState(false)
  const [pId,setPId]=useState("");


  const [showModal,setShowModal]=useState(false)
  const [fetchData,setFetchData]=useState([])
  const [search,setSeacrh]=useState('')



  const openModal=()=>{
    setIsModal(true)
  }

  const closeModal=()=>{
    setIsModal(false)
  }

  const openEditModal=(id)=>{
    setPId(id)
    setEditModal(true)
  }

  const closeEditModal=()=>{
    setEditModal(false)
  }

    useEffect(()=>{
      getProducts()
      .then((res)=>setProducts(res.data))

      const fetchProducts =async()=>{
        if(search.trim()===''){
          setFetchData([])
          setShowModal(false)
          return
        }

        try{
          const response=await getProducts()
          const searchData=response.data.filter((value)=>
            value.name.toLowerCase().includes(search.toLowerCase())
          )
          setFetchData(searchData)
          setShowModal(true)
        }catch(error){
          console.log(error);  
        }
      }
      fetchProducts()
    },[editModal,isModal,search])

    function handleSearchBar(id){
      setSeacrh('')
      setShowModal(false)
      navigate(`/admin/pro-details/${id}`)
    }

    const handleProductClick=(id)=>{
      navigate(`/admin/pro-details/${id}`) 
    }


    const handleDelete =async(id)=>{
      try{
        await deleteProductById(id)
        setProducts(products.filter(products => products.id!== id))
        alert("product deleted suucessfully")
      }catch(error){
        alert("Failed to delete the product")
      }
    }

  return (
    <div  className="p-8 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">All Products</h2>
    </div>
    <div className="bg-white shadow-md overflow-scroll scrollnone w-[97%] mt-10 rounded-lg p-6">
  <div className="flex flex-col md:flex-row justify-between items-center mb-6">
      
      {/* Search Bar */}
      <div className="flex border relative items-center  mb-4 md:mb-0">
        <input 
          type="text" 
          onChange={(e)=>setSeacrh(e.target.value)}
          placeholder="Search by product name" 
          className="w-full md:w-auto p-2  rounded-lg focus:outline-none "
        />

        {showModal?
        <div className='z-50 absolute top-10 bg-white w-[18rem] overflow-scroll scrollnone h-[20rem] rounded'>
        <ul className=''>
            {
              fetchData.map((value)=>{
                return(
                  <li onClick={()=>handleSearchBar(value.id)} className='border p-2'>{value.name}</li> 
                )
              })
            } 
        </ul>
      </div>:
      null
        }



        <button className="bg-blue-500 flex items-center space-x-3 hover:bg-blue-400 text-white py-2 px-4">
        <FaSearch/><span>Search</span>
        </button>
      </div>

      {/* Create New Button */}
      <button onClick={openModal} className="bg-blue-500 hover:bg-blue-400 flex items-center space-x-3 text-white py-2 px-4">
      <BsFillPlusCircleFill /> <span>Create New</span>
      </button>
    
    </div>
  <table class="min-w-full bg-white border border-gray-200">
  
    <thead>
      <tr>
      <th className="py-2 px-4 border-b">Id</th>
        <th className="py-2 px-4 border-b">Thumbnail</th>
        <th className="py-2 px-4 border-b">Product Name</th>
        <th className="py-2 px-4 border-b">Price</th>
        <th className="py-2 px-4 border-b">Stock</th>
        <th className="py-2 px-4 border-b">Actions</th>
      </tr>
    </thead>
    <tbody>
      {products.map((value)=>{
        return(
          <tr className="hover:bg-gray-50 w-[100%]">
      <td className="py-2 px-4 border-b">{value.id}</td>
        <td className="py-2 flex justify-center border-b"><img className='h-[5rem] w-[5rem]' src={value.image} alt="" /></td>
        <td className="py-2 px-4 border-b">{value.name}</td>
        <td className="py-2 px-4 w-[20%] border-b">₹ {value.price}</td>
        <td className="py-2 px-4 border-b">{value.stock}</td>
        <td className="py-2 px-4 w-[30%] border-b md:space-x-2"><button onClick={()=>handleProductClick(value.id)} className='border bg-green-600 text-white rounded p-1 w-20'>View</button>
        <button onClick={()=>openEditModal(value.id)} className='border bg-yellow-400 text-white rounded p-1 w-20'>Edit</button>
        <button onClick={()=>handleDelete(value.id)} className='border bg-red-600 text-white rounded p-1 w-20'>Del</button></td>
      </tr>
        )
      })}
    </tbody>
  </table>
</div>
{isModal && <AddingProducts closeModal={closeModal}/>}
{editModal && <EditPro id={pId} closeEditModal={closeEditModal}/>}
</div>
  )
}

export default TotalProducts
