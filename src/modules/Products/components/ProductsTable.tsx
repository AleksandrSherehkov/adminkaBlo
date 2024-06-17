import { FC, useState } from 'react';
import { format, parseISO } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import 'tailwindcss/tailwind.css';
import { selectAllProducts } from '../../../redux/products/productsSelector';
import { useAppSelector } from '../../../redux/hook';
import { GetProductsResponse } from '../../../shared/definitions/products';
import { Button, Tooltip } from '@nextui-org/react';
import { LiaUndoAltSolid } from 'react-icons/lia';
import { IoCheckmarkOutline, IoCloseOutline } from 'react-icons/io5';
import { MdDeleteOutline, MdOutlineEdit } from 'react-icons/md';
import { ConfirmModal } from '../../../shared/components/ConfirmModal';

interface ProductsTableProps {
  onEditProduct: (product: GetProductsResponse) => void;
  onDeleteProduct: (product: GetProductsResponse) => void;
  onRestoreProduct: (product: GetProductsResponse) => void;
  canManageProducts: boolean;
}

export const ProductsTable: FC<ProductsTableProps> = ({
  onEditProduct,
  onDeleteProduct,
  onRestoreProduct,
  canManageProducts,
}) => {
  const data = useAppSelector(selectAllProducts);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [currentProduct, setCurrentProduct] =
    useState<GetProductsResponse | null>(null);
  const [action, setAction] = useState<'delete' | 'restore'>('delete');

  const handleConfirm = () => {
    if (currentProduct) {
      if (action === 'delete') {
        onDeleteProduct(currentProduct);
      } else {
        onRestoreProduct(currentProduct);
      }
    }
    setIsConfirmOpen(false);
  };

  const openConfirmModal = (
    product: GetProductsResponse,
    actionType: 'delete' | 'restore',
  ) => {
    setCurrentProduct(product);
    setAction(actionType);
    setIsConfirmOpen(true);
  };

  const convertToLocalTime = (dateString: string | null) => {
    if (!dateString) {
      return 'Invalid date';
    }
    const date = parseISO(dateString);
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const zonedDate = toZonedTime(date, timeZone);
    return format(zonedDate, 'yyyy-MM-dd HH:mm');
  };

  return (
    <div className="overflow-x-auto xl:rounded-xl xl:border xl:p-2">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-1 xl:gap-0 ">
        <div className="hidden grid-cols-[1fr_1.5fr_0.5fr_0.5fr_0.5fr_0.5fr_0.5fr_0.5fr] items-center rounded-xl border-b border-dashed bg-gray-100 p-2 font-medium xl:grid ">
          <div className="">Product</div>
          <div className="text-center">Prov. ID</div>
          <div className="text-center ">Natals</div>
          <div className="text-center">Comp. Tests</div>
          <div className="text-center">Oracle</div>
          <div className="text-center">Is Subs.</div>
          <div className="text-center">Full Texts</div>
          <div></div>
        </div>

        {data.map(item => (
          <div
            key={item.id}
            className={`${item.isDeleted === true ? 'rounded-xl bg-red-500/5' : ''} grid w-full items-center gap-2 rounded-xl max-xl:border max-xl:text-xs xl:mb-0 xl:grid-cols-[1fr_1.5fr_0.5fr_0.5fr_0.5fr_0.5fr_0.5fr_0.5fr] xl:gap-0 xl:rounded-md xl:border-b xl:border-dashed xl:px-2 xl:py-1 xl:last:border-none`}
          >
            <div className="grid w-full grid-cols-1 break-all rounded-t-xl border-b border-dashed bg-gray-100 px-2 pt-2 xl:w-full xl:rounded-none xl:border-b-0 xl:bg-transparent xl:p-0">
              <span className="uppercase xl:lowercase">{item.name}</span>
              <span className="text-sm text-default-400 xl:text-xs">
                modified:&nbsp;
                <span className="text-[13px]/[18px] xl:text-xs">
                  {convertToLocalTime(item.modifiedAt)}
                </span>
              </span>
              {item.isDeleted ? (
                <span className="text-sm text-default-400 xl:text-xs">
                  deleted:&nbsp;
                  <span className="text-[13px]/[18px] xl:text-xs">
                    {convertToLocalTime(item.deletedAt)}
                  </span>
                </span>
              ) : (
                <span className="text-sm text-default-400 xl:text-xs">
                  deleted:&nbsp; -
                </span>
              )}
            </div>
            <div className="mobileLisLi">
              <label className="min-w-[125px] font-bold xl:hidden xl:w-0">
                Provider Product Id
              </label>
              <span>{item.providerProductId}</span>
            </div>
            <div className="mobileLisLi">
              <label className="font-bold xl:hidden">Natal Charts</label>
              <span className="">{item.natalCharts}</span>
            </div>
            <div className="mobileLisLi">
              <label className="font-bold xl:hidden">Compatibility Tests</label>
              <span className=" ">{item.compatibilityTests}</span>
            </div>
            <div className="mobileLisLi">
              <label className="font-bold xl:hidden">Oracle Questions</label>
              <span className=" ">{item.oracleQuestions}</span>
            </div>
            <div className="mobileLisLi ">
              <label className="font-bold xl:hidden">Is Subscription</label>
              <span className="grid items-center justify-center  ">
                {item.isSubscription === true ? (
                  <IoCheckmarkOutline
                    aria-label="Subscription Yes"
                    className="iconYes"
                  />
                ) : (
                  <IoCloseOutline
                    aria-label="Subscription No"
                    className="iconNo"
                  />
                )}
              </span>
            </div>
            <div className="mobileLisLi">
              <label className="font-bold xl:hidden">Show Full Texts</label>
              <span className="grid items-center justify-center">
                {item.showFullTexts === true ? (
                  <IoCheckmarkOutline
                    aria-label="Show Full Texts Yes"
                    className="iconYes"
                  />
                ) : item.showFullTexts === false ? (
                  <IoCloseOutline
                    aria-label="Show Full Texts No"
                    className="iconNo"
                  />
                ) : (
                  <div className="size-4 xl:size-5"></div>
                )}
              </span>
            </div>
            {canManageProducts && (
              <div
                className={`grid ${item.isDeleted ? 'grid-cols-1' : 'grid-cols-2'} gap-2 px-2 pb-2 xl:gap-3 xl:justify-self-end`}
              >
                {item.isDeleted === true ? (
                  <Tooltip
                    color="success"
                    content="Restore product"
                    className="hidden text-white xl:block"
                  >
                    <Button
                      className="w-full rounded-[6px] bg-green-500 uppercase text-white xl:w-max xl:opacity-45 "
                      type="button"
                      isIconOnly
                      color="success"
                      aria-label="restore product"
                      onClick={() => openConfirmModal(item, 'restore')}
                    >
                      <LiaUndoAltSolid className="icon" />
                      <span className="ml-3 text-sm xl:hidden">Restore</span>
                    </Button>
                  </Tooltip>
                ) : (
                  <>
                    <Tooltip
                      color="warning"
                      content="Edit product "
                      className="hidden text-white xl:block"
                    >
                      <Button
                        className="w-full rounded-[6px] bg-yellow-400 uppercase text-white xl:w-max xl:opacity-45 "
                        type="button"
                        isIconOnly
                        aria-label="edit product"
                        onClick={() => onEditProduct(item)}
                      >
                        <MdOutlineEdit className="icon" />
                        <span className="ml-3 text-sm xl:hidden">Edit</span>
                      </Button>
                    </Tooltip>
                    <Tooltip
                      color="danger"
                      content="Delete product"
                      className="hidden text-white xl:block"
                    >
                      <Button
                        className="w-full rounded-[6px] bg-red-600 uppercase text-white  xl:w-max xl:opacity-25"
                        isIconOnly
                        aria-label="delete product"
                        onClick={() => openConfirmModal(item, 'delete')}
                      >
                        <MdDeleteOutline className="icon" />
                        <span className="ml-3 text-sm xl:hidden">Delete</span>
                      </Button>
                    </Tooltip>
                  </>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
      <ConfirmModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleConfirm}
        title={action === 'delete' ? 'Confirm Delete' : 'Confirm Restore'}
        message={
          action === 'delete'
            ? `Do you really want to delete product ${currentProduct?.name}?`
            : `Do you really want to restore product ${currentProduct?.name}?`
        }
      />
    </div>
  );
};
