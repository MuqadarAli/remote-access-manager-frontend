import { useState } from 'react';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useForm } from 'react-hook-form';
import {
  useGetCommunityTypeQuery,
  useUpdateCommunityProfileMutation,
} from '../redux/rtk-query/community';
import Loader from '../components/Loader';
import SuccessMessage from '../components/Alert/SuccessMessage';
import ErrorMessage from '../components/Alert/ErrorMessage';
import { updateProfile } from '../redux/slice/auth';

type FormType = {
  id: string;
  name: string;
  description: string;
  address: string;
  city: string;
  zip_code: string;
  full_name: string;
  email: string;
  phone: string;
  communityType_id: string;
};

const AdminProfile = () => {
  const [addError, setAddError] = useState<string | null>(null);
  const [addSuccess, setAddSuccess] = useState<string | null>(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);
  const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false);
  const profile = useSelector(
    (state: RootState) => state.persistedReducer.auth.profile,
  );

  const { data: communityTypes } = useGetCommunityTypeQuery(undefined);
  const [updateCommunityProfile, { isLoading, isError, isSuccess }] =
    useUpdateCommunityProfileMutation();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormType>({
    defaultValues: {
      id: profile?.community?.id || '',
      full_name: profile?.full_name || '',
      email: profile?.email || '',
      name: profile?.community?.name || '',
      description: profile?.community?.description || '',
      address: profile?.community?.address || '',
      city: profile?.community?.city || '',
      zip_code: profile?.community?.zip_code || '',
      phone: profile?.phone || '',
      communityType_id: profile?.community?.community_type?.id || '',
    },
  });

  const dispatch = useDispatch();

  const onSubmit: any = async (data: any) => {
    try {
      const response = await updateCommunityProfile(data).unwrap();
      if (response?.statusCode == 200) {
        setAddSuccess(response?.message);
        console.log('response', response);

        dispatch(updateProfile(response?.value));
        setShowSuccessMessage(true);
      } else {
        setAddError(response?.message);
        setShowErrorMessage(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="mx-auto max-full">
        <Breadcrumb pageName="Profile" />
        <div>
          {isError && (
            <p className="text-lg leading-6 font-medium text-red-500">
              System Failed
            </p>
          )}
        </div>
        <div className="flex w-full px-2 sm:px-10 justify-center gap-8">
          <div className="w-full xl:w-1/2">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Personal Information
                </h3>
              </div>
              <div className="p-7">
                <form
                  method="post"
                  onSubmit={handleSubmit(onSubmit)}
                  className="mb-3"
                >
                  <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                    <div className="w-full xl:w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="full_name"
                      >
                        Full Name
                      </label>
                      <div className="relative">
                        <span className="absolute left-4.5 top-4">
                          <svg
                            className="fill-current"
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g opacity="0.8">
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M3.72039 12.887C4.50179 12.1056 5.5616 11.6666 6.66667 11.6666H13.3333C14.4384 11.6666 15.4982 12.1056 16.2796 12.887C17.061 13.6684 17.5 14.7282 17.5 15.8333V17.5C17.5 17.9602 17.1269 18.3333 16.6667 18.3333C16.2064 18.3333 15.8333 17.9602 15.8333 17.5V15.8333C15.8333 15.1703 15.5699 14.5344 15.1011 14.0655C14.6323 13.5967 13.9964 13.3333 13.3333 13.3333H6.66667C6.00363 13.3333 5.36774 13.5967 4.8989 14.0655C4.43006 14.5344 4.16667 15.1703 4.16667 15.8333V17.5C4.16667 17.9602 3.79357 18.3333 3.33333 18.3333C2.8731 18.3333 2.5 17.9602 2.5 17.5V15.8333C2.5 14.7282 2.93899 13.6684 3.72039 12.887Z"
                                fill=""
                              />
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M9.99967 3.33329C8.61896 3.33329 7.49967 4.45258 7.49967 5.83329C7.49967 7.214 8.61896 8.33329 9.99967 8.33329C11.3804 8.33329 12.4997 7.214 12.4997 5.83329C12.4997 4.45258 11.3804 3.33329 9.99967 3.33329ZM5.83301 5.83329C5.83301 3.53211 7.69849 1.66663 9.99967 1.66663C12.3009 1.66663 14.1663 3.53211 14.1663 5.83329C14.1663 8.13448 12.3009 9.99996 9.99967 9.99996C7.69849 9.99996 5.83301 8.13448 5.83301 5.83329Z"
                                fill=""
                              />
                            </g>
                          </svg>
                        </span>
                        <input
                          className="w-full rounded border border-stroke  py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          type="text"
                          {...register('full_name', {
                            required: 'This field is required',
                            maxLength: {
                              value: 100,
                              message:
                                'The full name of the admin must be no longer than 100 characters.',
                            },
                          })}
                          id="full_name"
                          placeholder="Enter full name"
                        />
                      </div>
                      {errors?.full_name && (
                        <p className="text-red-500">
                          {errors?.full_name?.message}
                        </p>
                      )}
                    </div>

                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="phone"
                      >
                        Phone Number
                      </label>
                      <input
                        className="w-full rounded border border-stroke  py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="text"
                        {...register('phone', {
                          required: 'This field is required',
                          pattern: {
                            value: /^.{1,40}$/,
                            message: 'Invalid phone number formate',
                          },
                        })}
                        id="phone"
                        placeholder="Enter phone number"
                      />
                      {errors?.phone && (
                        <p className="text-red-500">{errors?.phone?.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="mb-5.5">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="email"
                    >
                      Email
                    </label>
                    <div className="relative">
                      <span className="absolute left-4.5 top-4">
                        <svg
                          className="fill-current"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g opacity="0.8">
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M3.33301 4.16667C2.87658 4.16667 2.49967 4.54357 2.49967 5V15C2.49967 15.4564 2.87658 15.8333 3.33301 15.8333H16.6663C17.1228 15.8333 17.4997 15.4564 17.4997 15V5C17.4997 4.54357 17.1228 4.16667 16.6663 4.16667H3.33301ZM0.833008 5C0.833008 3.6231 1.9561 2.5 3.33301 2.5H16.6663C18.0432 2.5 19.1663 3.6231 19.1663 5V15C19.1663 16.3769 18.0432 17.5 16.6663 17.5H3.33301C1.9561 17.5 0.833008 16.3769 0.833008 15V5Z"
                              fill=""
                            />
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M0.983719 4.52215C1.24765 4.1451 1.76726 4.05341 2.1443 4.31734L9.99975 9.81615L17.8552 4.31734C18.2322 4.05341 18.7518 4.1451 19.0158 4.52215C19.2797 4.89919 19.188 5.4188 18.811 5.68272L10.4776 11.5161C10.1907 11.7169 9.80879 11.7169 9.52186 11.5161L1.18853 5.68272C0.811486 5.4188 0.719791 4.89919 0.983719 4.52215Z"
                              fill=""
                            />
                          </g>
                        </svg>
                      </span>
                      <input
                        className="w-full rounded border border-stroke  py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="text"
                        {...register('email', {
                          required: 'This field is required',
                          pattern: {
                            value:
                              /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                            message: 'Invalid email formate',
                          },
                        })}
                        id="email"
                        placeholder="Enter email"
                      />
                    </div>
                    {errors?.email && (
                      <p className="text-red-500">{errors?.email?.message}</p>
                    )}
                  </div>
                  <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                    <div className="w-full xl:w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="name"
                      >
                        Community Name
                      </label>
                      <input
                        className="w-full rounded border border-stroke  px-4.5 py-3  pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="text"
                        {...register('name', {
                          required: 'This field is required',
                          pattern: {
                            value: /^.{1,40}$/,
                            message:
                              'The name must be no longer than 40 characters.',
                          },
                        })}
                        id="name"
                        placeholder="Enter community name"
                      />

                      {errors?.name && (
                        <p className="text-red-500">{errors?.name?.message}</p>
                      )}
                    </div>

                    <div className="w-full xl:w-1/2">
                      <div>
                        <label
                          htmlFor="community_type"
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                        >
                          Community Type
                        </label>

                        <div className="relative z-20 bg-white dark:bg-form-input">
                          <select
                            className={`relative z-20 w-full appearance-none rounded border  border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input ${'text-black dark:text-white'}`}
                            id="community_type"
                            {...register('communityType_id', {
                              required: 'This field is required',
                            })}
                          >
                            <option
                              value=""
                              // disabled
                              className="text-body text-base dark:text-bodydark"
                            >
                              Select community type
                            </option>
                            {communityTypes?.value.map((communityType: any) => (
                              <option
                                value={communityType?.id}
                                key={communityType?.id}
                                className="text-body text-base dark:text-bodydark"
                              >
                                {communityType?.name}
                              </option>
                            ))}
                          </select>

                          <span className="absolute top-1/2 right-4 z-10 -translate-y-1/2">
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g opacity="0.8">
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                                  fill="#637381"
                                ></path>
                              </g>
                            </svg>
                          </span>
                        </div>
                        {errors?.communityType_id && (
                          <p className="text-red-500">
                            {errors?.communityType_id?.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="mb-5.5">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="address"
                    >
                      Address
                    </label>
                    <input
                      className="w-full rounded border border-stroke  py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      type="text"
                      {...register('address', {
                        required: 'This field is required',
                        maxLength: {
                          value: 1000,
                          message:
                            'The address must be no longer than 1000 characters.',
                        },
                      })}
                      id="address"
                      placeholder="Enter address"
                    />
                    {errors?.address && (
                      <p className="text-red-500">{errors?.address?.message}</p>
                    )}
                  </div>
                  <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                    <div className="w-full xl:w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="city"
                      >
                        City
                      </label>
                      <div className="relative">
                        <input
                          className="w-full rounded border border-stroke  py-3 px-4.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          type="text"
                          {...register('city', {
                            required: 'This field is required',
                            maxLength: {
                              value: 1000,
                              message:
                                'The city must be no longer than 1000 characters.',
                            },
                          })}
                          id="city"
                          placeholder="Enter city"
                        />
                        {errors?.city && (
                          <p className="text-red-500">
                            {errors?.city?.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="zip_code"
                      >
                        Zip Code
                      </label>
                      <input
                        className="w-full rounded border border-stroke  py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="text"
                        {...register('zip_code', {
                          required: 'This field is required',
                          maxLength: {
                            value: 100,
                            message:
                              'The zip code must be no longer than 100 characters.',
                          },
                        })}
                        id="zip_code"
                        placeholder="Enter zip code"
                      />
                      {errors?.zip_code && (
                        <p className="text-red-500">
                          {errors?.zip_code?.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="mb-5.5">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="description"
                    >
                      Description
                    </label>
                    <div className="relative">
                      <span className="absolute left-4.5 top-4">
                        <svg
                          className="fill-current"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g opacity="0.8" clipPath="url(#clip0_88_10224)">
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M1.56524 3.23223C2.03408 2.76339 2.66997 2.5 3.33301 2.5H9.16634C9.62658 2.5 9.99967 2.8731 9.99967 3.33333C9.99967 3.79357 9.62658 4.16667 9.16634 4.16667H3.33301C3.11199 4.16667 2.90003 4.25446 2.74375 4.41074C2.58747 4.56702 2.49967 4.77899 2.49967 5V16.6667C2.49967 16.8877 2.58747 17.0996 2.74375 17.2559C2.90003 17.4122 3.11199 17.5 3.33301 17.5H14.9997C15.2207 17.5 15.4326 17.4122 15.5889 17.2559C15.7452 17.0996 15.833 16.8877 15.833 16.6667V10.8333C15.833 10.3731 16.2061 10 16.6663 10C17.1266 10 17.4997 10.3731 17.4997 10.8333V16.6667C17.4997 17.3297 17.2363 17.9656 16.7674 18.4344C16.2986 18.9033 15.6627 19.1667 14.9997 19.1667H3.33301C2.66997 19.1667 2.03408 18.9033 1.56524 18.4344C1.0964 17.9656 0.833008 17.3297 0.833008 16.6667V5C0.833008 4.33696 1.0964 3.70107 1.56524 3.23223Z"
                              fill=""
                            />
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M16.6664 2.39884C16.4185 2.39884 16.1809 2.49729 16.0056 2.67253L8.25216 10.426L7.81167 12.188L9.57365 11.7475L17.3271 3.99402C17.5023 3.81878 17.6008 3.5811 17.6008 3.33328C17.6008 3.08545 17.5023 2.84777 17.3271 2.67253C17.1519 2.49729 16.9142 2.39884 16.6664 2.39884ZM14.8271 1.49402C15.3149 1.00622 15.9765 0.732178 16.6664 0.732178C17.3562 0.732178 18.0178 1.00622 18.5056 1.49402C18.9934 1.98182 19.2675 2.64342 19.2675 3.33328C19.2675 4.02313 18.9934 4.68473 18.5056 5.17253L10.5889 13.0892C10.4821 13.196 10.3483 13.2718 10.2018 13.3084L6.86847 14.1417C6.58449 14.2127 6.28409 14.1295 6.0771 13.9225C5.87012 13.7156 5.78691 13.4151 5.85791 13.1312L6.69124 9.79783C6.72787 9.65131 6.80364 9.51749 6.91044 9.41069L14.8271 1.49402Z"
                              fill=""
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_88_10224">
                              <rect width="20" height="20" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                      </span>

                      <textarea
                        className="w-full rounded border border-stroke  py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        {...register('description', {
                          required: 'This field is required',
                          maxLength: {
                            value: 1000,
                            message:
                              'The description must be no longer than 1000 characters.',
                          },
                        })}
                        id="description"
                        rows={6}
                        placeholder="Enter description"
                      ></textarea>
                    </div>
                    {errors?.description && (
                      <p className="text-red-500">
                        {errors?.description?.message}
                      </p>
                    )}
                  </div>

                  <div className="flex justify-end gap-4.5">
                    <button
                      className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                      type="submit"
                    >
                      {!isLoading ? 'Save' : <Loader />}
                    </button>
                  </div>
                </form>
                {isSuccess && showSuccessMessage && addSuccess && (
                  <SuccessMessage
                    message={addSuccess}
                    setShowMessage={setShowSuccessMessage}
                  />
                )}
                {addError && showErrorMessage && (
                  <ErrorMessage
                    message={addError}
                    setShowMessage={setShowErrorMessage}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminProfile;
