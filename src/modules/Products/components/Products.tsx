import { useEffect, useState, useRef, FC } from 'react';
import { useAppDispatch } from '../../../redux/hook';
import {
  fetchAllProductsThunk,
  fetchDeleteProductThunk,
  fetchRestoreProductThunk,
} from '../../../redux/products/productsOperations';
import { toast } from 'react-toastify';
import { Button, Checkbox, useDisclosure } from '@nextui-org/react';

import { ModalComponent } from '../../../shared/components/Modal';
import { GetProductsResponse } from '../../../shared/definitions/products';
import { ProductsTable } from './ProductsTable';
import { tostyHandleError } from '../helpers/tostyHandleError';
import { ProductForm } from './ProductForm';
import { SignInData } from '../../../shared/definitions/auth';
import { hasAccessRule } from '../../../shared/utils/access-utils';

import { IoAddOutline } from 'react-icons/io5';
import {
  ManageProducts,
  ReadProducts,
} from '../../../shared/constants/access-rules';
import { connect } from 'react-redux';
import { RootState } from '../../../redux/store';

interface ProductsProps {
  currentUser: SignInData;
}

const Products: FC<ProductsProps> = ({ currentUser }) => {
  const [isSelected, setIsSelected] = useState(false);
  const formikRef = useRef<any>(null);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');

  const [currentProduct, setCurrentProduct] =
    useState<GetProductsResponse | null>(null);
  const dispatch = useAppDispatch();

  const canManageProducts = hasAccessRule(currentUser, ManageProducts);

  useEffect(() => {
    (async () => {
      await dispatch(
        fetchAllProductsThunk({
          showDeletedItems: isSelected,
        }),
      );
    })();
  }, [isSelected]);

  const handleModalClose = (reloadList: boolean) => {
    if (reloadList) {
      dispatch(fetchAllProductsThunk({ showDeletedItems: isSelected }));
    }

    onClose();
  };

  const handleOpenModal = (
    mode: 'add' | 'edit',
    product?: GetProductsResponse,
  ) => {
    setModalMode(mode);
    if (product) {
      setCurrentProduct(product);
    } else {
      setCurrentProduct(null);
    }
    onOpen();
  };

  const handleConfirmAction = async (
    id: string,
    action: 'delete' | 'restore',
  ) => {
    try {
      if (action === 'delete') {
        await dispatch(fetchDeleteProductThunk(id))
          .unwrap()
          .then(() => {
            toast.success('Delete product successfully');
            dispatch(fetchAllProductsThunk({ showDeletedItems: isSelected }));
          })
          .catch(tostyHandleError);
      }
      if (action === 'restore') {
        await dispatch(fetchRestoreProductThunk(id))
          .unwrap()
          .then(() => {
            toast.success('Restore product successfully');
            dispatch(fetchAllProductsThunk({ showDeletedItems: isSelected }));
          })
          .catch(tostyHandleError);
      }
    } catch (error) {
      tostyHandleError(error);
    }
  };

  return (
    hasAccessRule(currentUser, ReadProducts) && (
      <>
        <div className="mb-5 flex items-center justify-between">
          <div
            className="flex flex-col gap-2 rounded-[6px]"
            aria-label="Show Deleted Items"
          >
            <Checkbox
              radius="sm"
              isSelected={isSelected}
              onValueChange={() => setIsSelected(!isSelected)}
              aria-label="Show Deleted Items"
            >
              <span className="text-sm xl:text-base">Show Deleted Items</span>
            </Checkbox>
          </div>
          {canManageProducts && (
            <Button
              className="min-w-10 rounded-[6px] bg-blue-500 px-2 text-white xl:gap-1"
              onClick={() => handleOpenModal('add')}
            >
              <IoAddOutline className="size-[18px]" />
              <span className="hidden uppercase xl:block xl:text-sm ">
                Add new product
              </span>
            </Button>
          )}
        </div>

        <ProductsTable
          onEditProduct={product => handleOpenModal('edit', product)}
          onDeleteProduct={product => handleConfirmAction(product.id, 'delete')}
          onRestoreProduct={product =>
            handleConfirmAction(product.id, 'restore')
          }
          canManageProducts={canManageProducts}
        />
        <ModalComponent
          isOpen={isOpen}
          onClose={onClose}
          title={modalMode === 'add' ? 'Add a new product' : 'Edit product'}
        >
          <ProductForm
            formikRef={formikRef}
            initialProduct={currentProduct}
            mode={modalMode}
            onClose={handleModalClose}
          />
        </ModalComponent>
      </>
    )
  );
};

const mapStateToProps = (state: RootState) => ({
  currentUser: state.auth.user,
});
const connector = connect(mapStateToProps, null);
export default connector(Products);
