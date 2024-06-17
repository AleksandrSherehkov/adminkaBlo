import React from 'react';
import { toast } from 'react-toastify';
import { importData } from '../../../services/api';
import { DataPageType } from '../../definitions/imports';
import { SignInData } from '../../definitions/auth';
import { RootState } from '../../../redux/store';
import { connect } from 'react-redux';
import {
  ManageCompatibilityCombinations,
  ManageDailyRecommendations,
  ManageMonths,
  ManagePersonalities,
  ManageYearlyRecommendations,
  ManageYears,
} from '../../constants/access-rules';
import { hasAccessRule } from '../../utils/access-utils';
import { useAppDispatch } from '../../../redux/hook';
import { stopLoading, startLoading } from '../../../redux/auth/authSlice';

export type ImportBarProps = {
  type: DataPageType;
  currentUser: SignInData;
};

const ImportBar = ({ type, currentUser }: ImportBarProps) => {
  const dispatch = useAppDispatch();

  const getUrl = (): string => {
    switch (type) {
      case DataPageType.Months:
        return '/import/months';
      case DataPageType.Years:
        return '/import/years';
      case DataPageType.CompatibilityCombinations:
        return '/import/compatibility-combinations';
      case DataPageType.DailyRecommendations:
        return '/import/daily-recommendations';
      case DataPageType.YearlyRecommendations:
        return '/import/yearly-recommendations';
      case DataPageType.Personalities:
        return '/import/personalities';
    }
  };

  const getAccessRule = (): string => {
    switch (type) {
      case DataPageType.Months:
        return ManageMonths;
      case DataPageType.Years:
        return ManageYears;
      case DataPageType.CompatibilityCombinations:
        return ManageCompatibilityCombinations;
      case DataPageType.DailyRecommendations:
        return ManageDailyRecommendations;
      case DataPageType.YearlyRecommendations:
        return ManageYearlyRecommendations;
      case DataPageType.Personalities:
        return ManagePersonalities;
    }
  };

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const files = event.target.files ?? [];
    const importFile = files.length > 0 ? files[0] : null;

    if (importFile) {
      const regex = new RegExp('^.*\.csv$');
      const typeRegex = new RegExp('^(application/vnd.ms-excel)|(text/csv)$');

      if (regex.test(importFile.name) && typeRegex.test(importFile.type)) {
        try {
          dispatch(startLoading());

          const response = await importData(importFile, getUrl());
          if (response.success) {
            toast.success(
              <div>
                <b>Import succeeded.</b>
                <p>Inserted records: {response.inserted}</p>
                <p>Updated records: {response.updated}</p>
                <p>Deleted records: {response.deleted}</p>
              </div>,
            );
          } else if (
            response.errorMessages &&
            response.errorMessages.length > 0
          ) {
            response.errorMessages.forEach((error: string) => {
              toast.error(error);
            });
          } else {
            toast.error('Import failed. Please contact admin');
          }
        } catch (error: any) {
          if (error.response && error.response.status === 400) {
            toast.error('Wrong import data');
          } else {
            toast.error('Import failed. Please contact admin');
          }
        } finally {
          dispatch(stopLoading());
        }
      } else {
        toast.error('Only CSV files are allowed');
      }
    }
  };

  return (
    hasAccessRule(currentUser, getAccessRule()) && (
      <div className="flex flex-row items-center justify-end gap-4 rounded-lg bg-granite px-6 py-6">
        <span className="block text-gray-700">
          Upload your <b>*.csv</b> file
        </span>
        <label
          htmlFor="import-file-upload"
          className="btn rounded bg-blue-500 px-4 py-2 font-bold uppercase text-white hover:bg-blue-700"
        >
          Import
        </label>
        <input
          id="import-file-upload"
          type="file"
          accept=".csv"
          onChange={handleFileUpload}
          className="hidden"
        />
      </div>
    )
  );
};

const mapStateToProps = (state: RootState) => ({
  currentUser: state.auth.user,
});

const connector = connect(mapStateToProps, null);
export default connector(ImportBar);
