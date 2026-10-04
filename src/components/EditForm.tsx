import React, { useState } from 'react';
import { IdCardData, DEFAULT_THEME_COLOR } from '../types';
import { resizeImage } from '../lib/utils';
import { ImagePlus, Save, Building2, User, Briefcase, CreditCard, Building } from 'lucide-react';
import { CHIMEI_LOGO_DATA_URL } from '../assets/chimeiLogo';
import { DOCTOR_PHOTO_DATA_URL } from '../assets/doctorPhoto';

interface EditFormProps {
  initialData?: IdCardData | null;
  onSave: (data: IdCardData) => void;
}

export default function EditForm({ initialData, onSave }: EditFormProps) {
  const [formData, setFormData] = useState<IdCardData>(
    initialData || {
      companyName: '',
      companyNameEn: '',
      employeeName: '',
      employeeNameEn: '',
      jobTitle: '',
      jobTitleEn: '',
      department: '',
      departmentEn: '',
      idNumber: '',
      photoDataUrl: '',
      logoDataUrl: '',
      themeColor: DEFAULT_THEME_COLOR,
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: 'photoDataUrl' | 'logoDataUrl') => {
    if (e.target.files && e.target.files[0]) {
      try {
        const maxSize = field === 'logoDataUrl' ? 400 : 800;
        const dataUrl = await resizeImage(e.target.files[0], maxSize, maxSize);
        setFormData((prev) => ({ ...prev, [field]: dataUrl }));
      } catch (err) {
        console.error('Failed to resize image', err);
        alert('Failed to process image. Please try another one.');
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.employeeName || !formData.companyName) {
      alert('Name and Company are required.');
      return;
    }
    onSave(formData);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 pb-20">
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="bg-gray-900 text-white p-6">
          <h1 className="text-2xl font-semibold tracking-tight">Setup Digital ID</h1>
          <p className="text-gray-400 text-sm mt-1">Fill in your ID card details</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Photo Upload */}
          <div className="flex flex-col items-center justify-center space-y-3">
            <div className="relative w-32 h-40 rounded-xl bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden">
              <img 
                src={formData.photoDataUrl || DOCTOR_PHOTO_DATA_URL} 
                alt="Profile" 
                className="w-full h-full object-cover" 
              />
              <label className="absolute inset-0 cursor-pointer bg-black/0 hover:bg-black/10 transition-colors flex items-center justify-center">
                <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, 'photoDataUrl')} />
              </label>
            </div>
          </div>

          <div className="space-y-4">
            {/* Identity Group */}
            <div className="space-y-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-2"><User className="w-3 h-3"/> Identity</h3>
              <div className="grid grid-cols-2 gap-3">
                <input required type="text" name="employeeName" value={formData.employeeName} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" placeholder="中文姓名 (e.g. 徐鴻麟)" />
                <input type="text" name="employeeNameEn" value={formData.employeeNameEn} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" placeholder="EN Name (e.g. HSU, HUNG-LIN)" />
              </div>
              <input type="text" name="idNumber" value={formData.idNumber} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" placeholder="Barcode ID Number" />
            </div>

            {/* Department Group */}
            <div className="space-y-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-2"><Building className="w-3 h-3"/> Department & Title</h3>
              <div className="grid grid-cols-2 gap-3">
                <input type="text" name="department" value={formData.department} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" placeholder="單位 (e.g. 急診醫學部)" />
                <input type="text" name="departmentEn" value={formData.departmentEn} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" placeholder="Dept EN" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <input type="text" name="jobTitle" value={formData.jobTitle} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" placeholder="職稱 (e.g. 主治醫師)" />
                <input type="text" name="jobTitleEn" value={formData.jobTitleEn} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" placeholder="Title EN" />
              </div>
            </div>

            {/* Organization Group */}
            <div className="space-y-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
               <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-2"><Building2 className="w-3 h-3"/> Organization</h3>
               <div className="grid grid-cols-2 gap-3">
                <input required type="text" name="companyName" value={formData.companyName} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" placeholder="醫院/公司名稱" />
                <input type="text" name="companyNameEn" value={formData.companyNameEn} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" placeholder="Company EN" />
              </div>
              <div className="flex items-center gap-3">
                <label className="text-sm font-medium text-gray-700 whitespace-nowrap">Theme Color</label>
                <input type="color" name="themeColor" value={formData.themeColor} onChange={handleChange} className="w-12 h-8 px-1 py-1 border border-gray-300 rounded cursor-pointer" />
              </div>
            </div>

            {/* Logo Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <ImagePlus className="w-4 h-4 text-gray-400" /> Hospital/Company Logo
              </label>
              <div className="flex items-center gap-4">
                <div className="relative w-24 h-14 rounded-lg bg-gray-50 border border-gray-300 flex items-center justify-center overflow-hidden p-1.5">
                  <img 
                    src={formData.logoDataUrl || CHIMEI_LOGO_DATA_URL} 
                    alt="Logo Preview" 
                    className="w-full h-full object-contain" 
                  />
                  <label className="absolute inset-0 cursor-pointer bg-black/0 hover:bg-black/10 transition-colors flex items-center justify-center">
                    <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, 'logoDataUrl')} />
                  </label>
                </div>
                {formData.logoDataUrl && (
                  <button type="button" onClick={() => setFormData((prev) => ({ ...prev, logoDataUrl: '' }))} className="text-xs text-red-500 font-medium">Remove Logo</button>
                )}
              </div>
            </div>
          </div>

          <button type="submit" className="w-full bg-gray-900 text-white py-3 px-4 rounded-xl font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 mt-6">
            <Save className="w-5 h-5" /> Save ID Card
          </button>
        </form>
      </div>
    </div>
  );
}
