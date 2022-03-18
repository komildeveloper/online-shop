import React from 'react'
import { useState, useEffect, useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { LangContext } from '../../context/LangContext'
import { PhoneContext } from '../../context/PhoneContext'
import { NotebookContext } from '../../context/NotebookContext'
import { AccessorieContext } from '../../context/AccessorieContext'
import { TestContext } from '../../context/TestContext'
import cardLikeLight from '../../assets/img/card-likeLight.svg'
import cardLikeDark from '../../assets/img/like-dark.svg'
import starIcon from '../../assets/img/star-icon.svg'
import dataSelected from '../../localization/Selected'
import basketImg2 from '../../assets/img/savat2.svg'

function Selected() {
  const { testNumber, setTestNumber } = useContext(TestContext)
  const { lang, setLang } = useContext(LangContext)
  const [selectedProduct, setSelectedProduct] = useState([])
  const [selectedIconBool, setSelectedIconBool] = useState(0)

  const { phoneId, setPhoneId } = useContext(PhoneContext)
  const { notebookId, setNotebookId } = useContext(NotebookContext)
  const { accessorieId, setAccessorieId } = useContext(AccessorieContext)

  let likeIcon

  useEffect(() => {
    fetch('http://localhost:3001/selected')
      .then(res => res.json())
      .then(data => setSelectedProduct(data))
  }, [selectedIconBool])

  function selectFunction(e) {
    e.preventDefault()
    let id = e.target.id
    let index = selectedProduct.findIndex(selec => selec.id == e.target.id)
    selectedProduct[index].selectBool = false
    setSelectedIconBool(Math.ceil(Math.random() * 1000000))
    fetch(`http://localhost:3001/selected/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...selectedProduct[index]
      })
    })

    if (id <= 6) {
      fetch(`http://localhost:3001/phones/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...selectedProduct[index]
        })
      })
    } else if (id <= 10) {
      fetch(`http://localhost:3001/notebooks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...selectedProduct[index]
        })
      })
    } else {
      fetch(`http://localhost:3001/accessories/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...selectedProduct[index]
        })
      })
    }

    if (!selectedProduct[index].selectBool && selectedProduct.length > 0) {
      fetch(`http://localhost:3001/selected/${id}`, {
        method: 'Delete'
      })
    }

    setTestNumber(Math.ceil(Math.random() * 10000))
  }

  if (selectedProduct.length > 0) {
    return (
      <div className=" products-page">
        <h3 className=" ps-5 text-center">{dataSelected[lang]?.content1}</h3>
        <div className="phone-list">
          {selectedProduct.map(phone => {
            if (phone.selectBool) {
              likeIcon = cardLikeDark
            } else {
              likeIcon = cardLikeLight
            }

            return (
              <NavLink
                id={phone?.id}
                onClick={e => setPhoneId(e?.target?.id)}
                className="card"
                to="/phone"
              >
                <button
                  id={phone?.id}
                  onClick={e => selectFunction(e)}
                  className="card-like btn "
                >
                  <img
                    id={phone?.id}
                    className="cardLike-img"
                    src={likeIcon}
                    alt="icon"
                    width="20"
                    height="20"
                  />
                </button>
                <img
                  id={phone?.id}
                  className=" mb-4 "
                  src={phone?.imgLinks[0]}
                  alt="photo"
                  width="240"
                  height="230"
                />
                <div id={phone?.id} className="card-bottom">
                  <p id={phone?.id} className="product-name">
                    {phone?.name}
                  </p>
                  <p id={phone?.id} className="raiting">
                    <img
                      id={phone?.id}
                      className=" star-icon"
                      src={starIcon}
                      alt="star icon"
                    />{' '}
                    {phone?.raiting}
                  </p>
                </div>
                <p id={phone?.id} className="product-price">
                  {phone?.price} {dataSelected[lang]?.content2}
                </p>
              </NavLink>
            )
          })}
        </div>
      </div>
    )
  } else {
    return (
      <div className="emptyCart d-flex flex-column align-items-center pb-4">
        <img
          className=" mb-4"
          src={basketImg2}
          alt="photo"
          width="410"
          height="320"
        />
        <h2 className="empty-heading">{dataSelected[lang]?.content3}</h2>
        <p className="empty-desc mb-4">{dataSelected[lang]?.content4}</p>
        <NavLink className="empty-link" to="/">
          {dataSelected[lang]?.content5}
        </NavLink>
      </div>
    )
  }
}

export default Selected
