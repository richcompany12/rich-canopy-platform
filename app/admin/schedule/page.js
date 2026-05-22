'use client';
import { useState, useEffect } from 'react';
import { db } from '../../lib/firebase';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, query, orderBy } from 'firebase/firestore';

export default function Schedule() {
  const [schedules, setSchedules] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [form, setForm] = useState({
    customerName: '',
    phone: '',
    model: '',
    work: '',
    date: '',
    time: '',
    status: '예약',
    memo: '',
  });

  const statusColors = { '예약': '#4FC3F7', '진행중': '#FFD700', '완료': '#4CAF50' };

  const fetchSchedules = async () => {
    const q = query(collection(db, 'schedules'), orderBy('date', 'asc'));
    const snapshot = await getDocs(q);
    setSchedules(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  useEffect(() => { fetchSchedules(); }, []);

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    return { firstDay, daysInMonth, year, month };
  };

  const getSchedulesForDate = (dateStr) => schedules.filter(s => s.date === dateStr);

  const formatDateStr = (year, month, day) => {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  const handleDateClick = (dateStr) => {
    setSelectedDate(selectedDate === dateStr ? null : dateStr);
  };

  const openAddModal = () => {
    setEditItem(null);
    setForm({
      customerName: '', phone: '', model: '', work: '',
      date: selectedDate || '', time: '', status: '예약', memo: '',
    });
    setShowModal(true);
  };

  const openEditModal = (item) => {
    setEditItem(item);
    setForm({
      customerName: item.customerName,
      phone: item.phone,
      model: item.model,
      work: item.work,
      date: item.date,
      time: item.time,
      status: item.status,
      memo: item.memo || '',
    });
    setShowModal(true);
  };

  const handleSubmit = async () => {
    if (!form.customerName || !form.date) {
      alert('고객명과 날짜는 필수입니다.');
      return;
    }
    if (editItem) {
      await updateDoc(doc(db, 'schedules', editItem.id), form);
    } else {
      await addDoc(collection(db, 'schedules'), form);
    }
    setShowModal(false);
    fetchSchedules();
  };

  const handleDelete = async (id) => {
    if (!confirm('삭제할까요?')) return;
    await deleteDoc(doc(db, 'schedules', id));
    setShowModal(false);
    fetchSchedules();
  };

  const handleStatusChange = async (item) => {
    const next = item.status === '예약' ? '진행중' : item.status === '진행중' ? '완료' : '예약';
    await updateDoc(doc(db, 'schedules', item.id), { status: next });
    fetchSchedules();
  };

  const { firstDay, daysInMonth, year, month } = getDaysInMonth(currentMonth);

  const inputStyle = {
    width: '100%', backgroundColor: '#0d1117', border: '0.5px solid #21262D',
    color: '#F0F6FC', padding: '10px', borderRadius: '4px', fontSize: '13px', marginBottom: '10px',
  };

  const filteredSchedules = selectedDate
    ? schedules.filter(s => s.date === selectedDate)
    : schedules;

  return (
    <div style={{ backgroundColor: '#111418', minHeight: '100vh', padding: '20px' }}>

      {/* 모달 */}
      {showModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.8)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 999,
        }}>
          <div style={{
            backgroundColor: '#161b22', border: '0.5px solid #21262D',
            borderRadius: '12px', padding: '24px', width: '320px', maxHeight: '90vh', overflowY: 'auto',
          }}>
            <p style={{ color: '#4FC3F7', fontSize: '13px', letterSpacing: '2px', marginBottom: '16px' }}>
              {editItem ? '작업 수정' : '새 작업 등록'}
            </p>

            <input placeholder="고객명 *" value={form.customerName}
              onChange={e => setForm({ ...form, customerName: e.target.value })} style={inputStyle} />

            {/* 전화번호 + 전화걸기 버튼 */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
              <input placeholder="연락처" value={form.phone}
                onChange={e => setForm({ ...form, phone: e.target.value })}
                style={{ ...inputStyle, flex: 1, marginBottom: 0 }} />
              {form.phone && (
                <a href={`tel:${form.phone}`} style={{
                  backgroundColor: '#0d2137',
                  border: '0.5px solid #4FC3F7',
                  color: '#4FC3F7',
                  padding: '10px 14px',
                  borderRadius: '4px',
                  fontSize: '16px',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  whiteSpace: 'nowrap',
                }}>📞</a>
              )}
            </div>

            <input placeholder="차종" value={form.model}
              onChange={e => setForm({ ...form, model: e.target.value })} style={inputStyle} />
            <input placeholder="작업내용" value={form.work}
              onChange={e => setForm({ ...form, work: e.target.value })} style={inputStyle} />
            <input type="date" value={form.date}
              onChange={e => setForm({ ...form, date: e.target.value })} style={inputStyle} />
            <input type="time" value={form.time}
              onChange={e => setForm({ ...form, time: e.target.value })} style={inputStyle} />
            <select value={form.status}
              onChange={e => setForm({ ...form, status: e.target.value })} style={inputStyle}>
              <option>예약</option>
              <option>진행중</option>
              <option>완료</option>
            </select>
            <textarea placeholder="기타 메모" value={form.memo}
              onChange={e => setForm({ ...form, memo: e.target.value })}
              rows={3} style={{ ...inputStyle, resize: 'vertical' }} />

            <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
              <button onClick={handleSubmit} style={{
                flex: 1, backgroundColor: '#4FC3F7', color: '#111418',
                border: 'none', padding: '12px', borderRadius: '4px', fontWeight: '700', cursor: 'pointer',
              }}>{editItem ? '수정 완료' : '등록'}</button>
              <button onClick={() => setShowModal(false)} style={{
                flex: 1, backgroundColor: 'transparent', border: '0.5px solid #21262D',
                color: '#8B949E', padding: '12px', borderRadius: '4px', cursor: 'pointer',
              }}>취소</button>
            </div>

            {editItem && (
              <button onClick={() => handleDelete(editItem.id)} style={{
                width: '100%', backgroundColor: 'transparent',
                border: '0.5px solid #3d1a1a', color: '#E63946',
                padding: '10px', borderRadius: '4px', cursor: 'pointer', fontSize: '13px',
              }}>삭제</button>
            )}
          </div>
        </div>
      )}

      {/* 헤더 */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <a href="/admin/dashboard" style={{ color: '#484F58', fontSize: '13px' }}>← 대시보드</a>
          <h1 style={{ color: '#F0F6FC', fontSize: '18px', fontWeight: '600' }}>작업 스케줄</h1>
        </div>
        <button onClick={openAddModal} style={{
          backgroundColor: '#4FC3F7', color: '#111418',
          border: 'none', padding: '8px 16px', borderRadius: '4px',
          fontSize: '12px', fontWeight: '700', cursor: 'pointer',
        }}>+ 등록</button>
      </div>

      {/* 달력 */}
      <div style={{ backgroundColor: '#161b22', border: '0.5px solid #21262D', borderRadius: '8px', padding: '16px', marginBottom: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <button onClick={() => setCurrentMonth(new Date(year, month - 1))} style={{
            background: 'none', border: 'none', color: '#8B949E', fontSize: '18px', cursor: 'pointer',
          }}>‹</button>
          <p style={{ color: '#F0F6FC', fontSize: '14px', fontWeight: '600' }}>
            {year}년 {month + 1}월
          </p>
          <button onClick={() => setCurrentMonth(new Date(year, month + 1))} style={{
            background: 'none', border: 'none', color: '#8B949E', fontSize: '18px', cursor: 'pointer',
          }}>›</button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px', marginBottom: '8px' }}>
          {['일', '월', '화', '수', '목', '금', '토'].map(d => (
            <div key={d} style={{ textAlign: 'center', color: '#484F58', fontSize: '11px', padding: '4px' }}>{d}</div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px' }}>
          {Array(firstDay).fill(null).map((_, i) => <div key={`empty-${i}`} />)}
          {Array(daysInMonth).fill(null).map((_, i) => {
            const day = i + 1;
            const dateStr = formatDateStr(year, month, day);
            const daySchedules = getSchedulesForDate(dateStr);
            const isSelected = selectedDate === dateStr;
            const isToday = dateStr === formatDateStr(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());

            return (
              <div key={day} onClick={() => handleDateClick(dateStr)} style={{
                textAlign: 'center', padding: '6px 2px', borderRadius: '6px', cursor: 'pointer',
                backgroundColor: isSelected ? '#0d2137' : 'transparent',
                border: isToday ? '0.5px solid #4FC3F7' : '0.5px solid transparent',
              }}>
                <div style={{ color: isSelected ? '#4FC3F7' : '#F0F6FC', fontSize: '12px', marginBottom: '3px' }}>{day}</div>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '2px', flexWrap: 'wrap' }}>
                  {daySchedules.map(s => (
                    <div key={s.id} style={{
                      width: '5px', height: '5px', borderRadius: '50%',
                      backgroundColor: statusColors[s.status],
                    }} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 선택된 날짜 표시 */}
      {selectedDate && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <p style={{ color: '#8B949E', fontSize: '12px' }}>{selectedDate} 일정</p>
          <button onClick={() => setSelectedDate(null)} style={{
            background: 'none', border: 'none', color: '#484F58', fontSize: '12px', cursor: 'pointer',
          }}>전체보기</button>
        </div>
      )}

      {/* 카드 목록 */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {filteredSchedules.length === 0 ? (
          <p style={{ color: '#484F58', fontSize: '13px', textAlign: 'center', padding: '40px 0' }}>
            {selectedDate ? '이 날 일정이 없습니다.' : '등록된 일정이 없습니다.'}
          </p>
        ) : (
          filteredSchedules.map(item => (
            <div key={item.id}
              onClick={() => openEditModal(item)}
              style={{
                backgroundColor: '#161b22',
                border: `0.5px solid ${statusColors[item.status]}33`,
                borderRadius: '8px', padding: '14px',
                borderLeft: `3px solid ${statusColors[item.status]}`,
                cursor: 'pointer',
                userSelect: 'none',
                WebkitUserSelect: 'none',
              }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ color: '#F0F6FC', fontSize: '14px', fontWeight: '600' }}>{item.customerName}</span>
                <button
                  onClick={e => { e.stopPropagation(); handleStatusChange(item); }}
                  style={{
                    backgroundColor: `${statusColors[item.status]}22`,
                    border: `0.5px solid ${statusColors[item.status]}`,
                    color: statusColors[item.status],
                    padding: '3px 10px', borderRadius: '4px', fontSize: '10px', cursor: 'pointer',
                  }}>{item.status}</button>
              </div>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                {item.model && <span style={{ color: '#8B949E', fontSize: '12px' }}>🏍 {item.model}</span>}
                {item.work && <span style={{ color: '#8B949E', fontSize: '12px' }}>🔧 {item.work}</span>}
                <span style={{ color: '#484F58', fontSize: '12px' }}>📅 {item.date} {item.time}</span>
              </div>
              {item.memo && (
                <div style={{ backgroundColor: '#0d1117', borderRadius: '4px', padding: '8px', marginTop: '8px' }}>
                  <p style={{ color: '#484F58', fontSize: '11px' }}>📝 {item.memo}</p>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}