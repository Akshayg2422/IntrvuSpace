import React from 'react'
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import { AutoSearchInputProps } from "./interfaces"
import { InputHeading,Image } from '@Components'
import { getPhoto } from '@Utils'


function AutoSearchInput({ value,
  data,
  onSelect,
  onSearch,
  className,
  heading,
  placeholder,
  formatResult,
  handleOnFocus,
  handleOnHover,
  variant,

}: AutoSearchInputProps) {
 
  const formateResult =(item)=>{
    console.log('tested')
       
    return(
      
        <div >
          {variant ?
        <div className="row py-2  " style={{color:"#363535"}}>
          <div className="pl-4 pr-2 pt-2 ">
            <Image variant={'rounded'}
              size={'xs'}
              src={getPhoto(item?.profile_image)} 
              />
          </div>
          <div>
            <div className="text-sm"> {item?.name}</div>
          <div  className="text-xs text-muted">  {item?.designation? item?.designation:'-'} / {item?.department?item?.department:"-"}</div>
          </div>
        </div>:
        <div className="text-sm" style={{color:"#363535"}}> {item?.name}</div>

  }
    
      </div>
    )
    
        }

  return (
    <div> <div className="App">
      <header className="App-header">
        <div >
        <InputHeading heading={heading} />
          <ReactSearchAutocomplete
            items={data}
            onSearch={onSearch}
            onSelect={onSelect}
              onFocus={handleOnFocus}
             autoFocus
            formatResult={formateResult}
            placeholder={placeholder}
            showIcon={false}
            showClear={false}
            styling={{ borderRadius: "4px", boxShadow: "none", zIndex: 2, backgroundColor:'white',color:"#b3b5b3",fontSize:"16px",
          placeholderColor:"#b3b5b3",
        fontFamily:"sans-serif"   }}
            className={className}
          />
        </div>
      </header>
    </div></div>
  )
}

export default AutoSearchInput