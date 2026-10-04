import React, { useState, useEffect } from 'react';
import EditForm from './components/EditForm';
import DigitalId from './components/DigitalId';
import { IdCardData } from './types';
import { DOCTOR_PHOTO_DATA_URL } from './assets/doctorPhoto';

const STORAGE_KEY = 'digital_id_data';

const DEFAULT_CARD_DATA: IdCardData = {
  companyName: '奇美醫院',
  companyNameEn: 'Chi Mei Medical Center',
  employeeName: '徐鴻麟',
  employeeNameEn: 'Hung-Lin, Hsu',
  jobTitle: '主治醫師',
  jobTitleEn: 'Attending Physician',
  department: '急診醫學部',
  departmentEn: 'Emergency Medicine',
  idNumber: 'A30825',
  photoDataUrl: DOCTOR_PHOTO_DATA_URL,
  logoDataUrl: '',
  themeColor: '#ff8c00',
};

export default function App() {
  const [data, setData] = useState<IdCardData>(DEFAULT_CARD_DATA);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Migrate old placeholder data if present
        if (!parsed.idNumber || parsed.idNumber === 'CHIMEI-12345') {
          parsed.idNumber = 'A30825';
        }
        if (!parsed.employeeNameEn || parsed.employeeNameEn === 'HSU, HUNG-LIN') {
          parsed.employeeNameEn = 'Hung-Lin, Hsu';
        }
        const LOGO_BUILD_KEY = 'chimei_hospital_logo_build_v5';
        if (localStorage.getItem('chimei_logo_build') !== LOGO_BUILD_KEY) {
          parsed.logoDataUrl = '';
          localStorage.setItem('chimei_logo_build', LOGO_BUILD_KEY);
        } else if (parsed.logoDataUrl && (parsed.logoDataUrl.includes('header_logo') || parsed.logoDataUrl.length < 150000)) {
          parsed.logoDataUrl = '';
        }
        const updated = {
          ...DEFAULT_CARD_DATA,
          ...parsed,
          photoDataUrl: (parsed.photoDataUrl && parsed.photoDataUrl.length > 50) ? parsed.photoDataUrl : DOCTOR_PHOTO_DATA_URL,
          companyName: parsed.companyName === '奇美醫療體系' || parsed.companyName === '奇美醫療財團法人 奇美醫院' ? '奇美醫院' : (parsed.companyName || '奇美醫院'),
          employeeName: parsed.employeeName || '徐鴻麟',
          employeeNameEn: parsed.employeeNameEn || 'Hung-Lin, Hsu',
          idNumber: parsed.idNumber || 'A30825',
          jobTitle: parsed.jobTitle || '主治醫師',
          jobTitleEn: parsed.jobTitleEn || 'Attending Physician',
          department: parsed.department || '急診醫學部',
          departmentEn: parsed.departmentEn || 'Emergency Medicine',
        };
        setData(updated);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {
        console.error('Failed to parse saved ID data');
        setData(DEFAULT_CARD_DATA);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_CARD_DATA));
      }
    } else {
      setData(DEFAULT_CARD_DATA);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_CARD_DATA));
    }
    // Directly show the card without jumping into edit form
    setIsEditing(false);
    setIsLoaded(true);
  }, []);

  const handleSave = (newData: IdCardData) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
    setData(newData);
    setIsEditing(false);
  };

  const handlePhotoUpload = (photoDataUrl: string) => {
    setData((prev) => {
      const updated = { ...prev, photoDataUrl };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  if (!isLoaded) return null;

  return (
    <>
      {isEditing ? (
        <div className="overflow-y-auto h-full w-full bg-gray-50 touch-pan-y" style={{ touchAction: 'auto' }}>
          <EditForm initialData={data} onSave={handleSave} />
        </div>
      ) : (
        <DigitalId data={data} onEdit={handleEdit} onPhotoUpload={handlePhotoUpload} />
      )}
    </>
  );
}
