import { icons } from '@Assets';
import { AutoFocusInput, Button, CommonTable, Input, MenuBar, Modal, NoDataFound, ScreenHeading, Spinner, TextArea, showToast } from '@Components';
import { useInput, useLoader, useModal } from '@Hooks';
import { addSectorCorporate, getSectorCorporate } from '@Redux';
import { ADD_SECTOR_CORPORATE_RULES, INITIAL_PAGE, capitalizeFirstLetter, getValidateError, ifObjectExist, paginationHandler, validate } from '@Utils';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';


function Sector() {


  const dispatch = useDispatch()

  const { sectorsCorporate,
    sectorsCorporateNumOfPages,
    sectorsCorporateCurrentPages
  } = useSelector((state: any) => state.DashboardReducer)


  const loader = useLoader(false);

  /**
   * add sector state
   */
  const addSectorLoader = useLoader(false);
  const addSectorModal = useModal(false);

  const sectorName = useInput("");
  const sectorDescription = useInput("");
  const [editId, setEditId] = useState<any>()
  const [selectedSector, setSelectedSector] = useState<any>(undefined)
  const inFocus = useRef<any>(null)


  const MENU = [
    { id: '0', name: "Edit", icon: icons.edit },
  ]

  useEffect(() => {
    getSectorCorporateApiHandler(INITIAL_PAGE)
  }, [])


  /**
   * add sector api
   */

  const addSectorApiHandler = () => {


    const params = {
      name: sectorName.value,
      description: sectorDescription.value,
      ...(selectedSector && { id: selectedSector?.id })
    }

    const validation = validate(ADD_SECTOR_CORPORATE_RULES, params)

    if (ifObjectExist(validation)) {
      addSectorLoader.show()

      dispatch(
        addSectorCorporate({
          params,
          onSuccess: (success: any) => () => {
            resetValues();
            addSectorLoader.hide()
            getSectorCorporateApiHandler(sectorsCorporateCurrentPages)
            showToast(success.message, 'success')
          },
          onError: (error: any) => () => {
            addSectorLoader.hide()
            showToast(error.error_message, 'error')
          },
        })
      )

    } else {
      showToast(getValidateError(validation))
    }
  };

  /**
   * get sector api
   */
  const getSectorCorporateApiHandler = (page_number: number) => {

    const params = {
      page_number,
    }

    loader.show();

    dispatch(
      getSectorCorporate({
        params,
        onSuccess: () => () => {
          loader.hide();
        },
        onError: () => () => {
          loader.hide();
        },
      })
    );
  };

  const normalizedTableData = (data: any) => {
    return data?.map((el: any) => {
      const { name, description } = el

      return {
        Name: capitalizeFirstLetter(name),
        description: capitalizeFirstLetter(description),
        '':
          <MenuBar
            menuData={MENU}
            onClick={(item) => {
              if (item?.id === MENU[0].id) {

                addSectorModal.show();

                /**
                 * prefill the sector modal
                 */

                setSelectedSector(el)
                setEditId(el)
                sectorName.set(name)
                sectorDescription.set(description)

              }


            }} />
      };
    });
  };


  /**
   * reset Value
   */

  function resetValues() {
    setEditId('');
    sectorName.set('');
    sectorDescription.set('');
    addSectorModal.hide();
    setSelectedSector(undefined);

  }

  return (
    <>
      <div className={'screen-padding'}>

        <ScreenHeading
          text={'Sectors'}
          children={
            <div className={'d-flex justify-content-end'}>
              <div className={'btn-wrapper'}>
                <Button
                  block
                  text={'Add'}
                  onClick={addSectorModal.show}
                />
              </div>
            </div>
          }
        />

        {
          loader.loader && <div className={'loader-container'}><Spinner /></div>
        }

        {
          !loader.loader &&
          sectorsCorporate?.length > 0
          &&
          <CommonTable
            isPagination={sectorsCorporateNumOfPages > 1}
            displayDataSet={normalizedTableData(sectorsCorporate)}
            noOfPage={sectorsCorporateNumOfPages}
            currentPage={sectorsCorporateCurrentPages}
            paginationNumberClick={(currentPage) => {
              getSectorCorporateApiHandler(paginationHandler("current", currentPage));

            }}
            previousClick={() => {
              getSectorCorporateApiHandler(paginationHandler("prev", sectorsCorporateCurrentPages))
            }
            }
            nextClick={() => {
              getSectorCorporateApiHandler(paginationHandler("next", sectorsCorporateCurrentPages));
            }
            }
          />
        }
        {
          !loader.loader &&
          sectorsCorporate?.length <= 0 &&
          <div className={'no-data-container'}>
            <NoDataFound />
          </div>
        }
      </div>


      <Modal
        loading={addSectorLoader.loader}
        title={`${editId ? "Edit" : "Create"} Sector`}
        isOpen={addSectorModal.visible}
        onClose={resetValues}
        onClick={addSectorApiHandler}
      >
        <div className='row'>
          <div className='col-sm-6'>
            <Input
              heading={"Name"}
              value={sectorName.value}
              onChange={sectorName.onChange}
              innerRef={inFocus}
            />
          </div>
        </div>
        <TextArea
          heading={'Description'}
          height={"200px"}
          value={sectorDescription.value}
          onChange={sectorDescription.onChange}
        />

      </Modal >
    </>
  )
}

export { Sector };
