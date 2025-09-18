"use client";

import { useEffect, useState } from "react";
import { createLibraryReservationAction } from "@/app/yonsei-library/actions";

const library = {
  학술정보관: {
    room: [
      {
        name: "1F Y-스마트 스페이스",
        roomNumbers: [
          { roomNumber: "세미나룸(Yellow)", min: 3, max: 5 },
          { roomNumber: "세미나룸(Blue)", min: 3, max: 5 },
        ],
      },
      {
        name: "3층 Y-CELL",
        roomNumbers: [
          { roomNumber: "Y-CELL 1", min: 2, max: 4 },
          { roomNumber: "Y-CELL 2", min: 3, max: 6 },
          { roomNumber: "Y-CELL 3", min: 2, max: 4 },
        ],
      },
      {
        name: "3층 Y-CAST",
        roomNumbers: [
          { roomNumber: "Y-CAST 1", min: 0, max: 0 },
          { roomNumber: "Y-CAST 2", min: 0, max: 0 },
        ],
      },
      {
        name: "2F 협업코너 A",
        roomNumbers: [
          { roomNumber: "협업실 A 06", min: 3, max: 5 },
          { roomNumber: "협업실 A 04", min: 3, max: 5 },
          { roomNumber: "협업실 A 03", min: 3, max: 5 },
          { roomNumber: "협업실 A 05", min: 3, max: 5 },
          { roomNumber: "협업실 A 08", min: 3, max: 5 },
          { roomNumber: "협업실 A 01", min: 3, max: 5 },
          { roomNumber: "협업실 A 02", min: 3, max: 5 },
          { roomNumber: "협업실 A 07", min: 3, max: 5 },
        ],
      },
      {
        name: "2F 협업코너 B",
        roomNumbers: [
          { roomNumber: "협업실 B 04", min: 3, max: 5 },
          { roomNumber: "협업실 B 08", min: 3, max: 5 },
          { roomNumber: "협업실 B 02", min: 3, max: 5 },
          { roomNumber: "협업실 B 07", min: 3, max: 5 },
          { roomNumber: "협업실 B 03", min: 3, max: 5 },
          { roomNumber: "협업실 B 01", min: 3, max: 5 },
          { roomNumber: "협업실 B 06", min: 3, max: 5 },
          { roomNumber: "협업실 B 05", min: 3, max: 5 },
        ],
      },
      {
        name: "3F 프리젠테이션룸",
        roomNumbers: [
          { roomNumber: "프리젠테이션룸-4", min: 0, max: 0 },
          { roomNumber: "프리젠테이션룸-5", min: 5, max: 20 },
        ],
      },
      {
        name: "5F 세미나룸",
        roomNumbers: [
          { roomNumber: "세미나룸 5-2", min: 4, max: 8 },
          { roomNumber: "세미나룸 5-1", min: 4, max: 8 },
          { roomNumber: "세미나룸 5-5", min: 0, max: 0 },
          { roomNumber: "세미나룸 5-3", min: 4, max: 8 },
          { roomNumber: "세미나룸 5-4", min: 4, max: 8 },
          { roomNumber: "세미나룸 5-5", min: 4, max: 8 },
        ],
      },
      {
        name: "6F 세미나룸",
        roomNumbers: [
          { roomNumber: "세미나룸 6-3", min: 4, max: 8 },
          { roomNumber: "세미나룸 6-4", min: 4, max: 8 },
          { roomNumber: "세미나룸 6-5", min: 4, max: 8 },
          { roomNumber: "세미나룸 6-6", min: 0, max: 0 },
          { roomNumber: "세미나룸 6-1", min: 4, max: 8 },
          { roomNumber: "세미나룸 6-2", min: 4, max: 8 },
          { roomNumber: "세미나룸 6-7", min: 0, max: 0 },
        ],
      },
    ],
  },
  중앙도서관: {
    room: [
      {
        name: "6F 세미나룸",
        roomNumbers: [
          { roomNumber: "세미나룸 6-10", min: 4, max: 6 },
          { roomNumber: "세미나룸 6-3", min: 4, max: 6 },
          { roomNumber: "세미나룸 6-6", min: 4, max: 6 },
          { roomNumber: "세미나룸 6-2", min: 4, max: 6 },
          { roomNumber: "세미나룸 6-4", min: 4, max: 6 },
          { roomNumber: "세미나룸 6-9", min: 4, max: 6 },
          { roomNumber: "세미나룸 6-8", min: 4, max: 6 },
          { roomNumber: "세미나룸 6-1", min: 4, max: 6 },
          { roomNumber: "세미나룸 6-11", min: 4, max: 6 },
          { roomNumber: "세미나룸 6-7", min: 4, max: 6 },
          { roomNumber: "세미나룸 6-5", min: 4, max: 6 },
        ],
      },
      {
        name: "4F 세미나룸",
        roomNumbers: [
          { roomNumber: "세미나룸 4-3", min: 4, max: 6 },
          { roomNumber: "세미나룸 4-5", min: 4, max: 6 },
          { roomNumber: "세미나룸 4-2", min: 4, max: 6 },
          { roomNumber: "세미나룸 4-6", min: 4, max: 6 },
          { roomNumber: "세미나룸 4-1", min: 4, max: 6 },
          { roomNumber: "세미나룸 4-4", min: 4, max: 6 },
        ],
      },
    ],
  },
};

export default function BookLibraryRoomForm() {
  const [selectedLibrary, setSelectedLibrary] = useState<
    "학술정보관" | "중앙도서관"
  >("학술정보관");
  const [selectedRoom, setSelectedRoom] = useState<string>("");
  // [추가됨] 선택된 시설 번호를 위한 state
  const [selectedRoomNumber, setSelectedRoomNumber] = useState<string>("");
  const [roomNumberList, setRoomNumberList] = useState<
    { roomNumber: string; min: number; max: number }[]
  >([]);

  const [participantId, setParticipantId] = useState("");
  const [participantPhone, setParticipantPhone] = useState("");
  const [participants, setParticipants] = useState<
    { id: string; phone: string }[]
  >([]);

  // [수정됨] 도서관이 변경될 때 시설 및 시설 번호 선택을 초기화하는 useEffect
  useEffect(() => {
    // 첫번째 시설을 기본값으로 설정
    const firstRoom = library[selectedLibrary].room[0]?.name || "";
    setSelectedRoom(firstRoom);
    setRoomNumberList([]); // 시설 번호 목록 초기화
    setSelectedRoomNumber(""); // 선택된 시설 번호 초기화
  }, [selectedLibrary]);

  // [수정됨] 시설이 변경될 때 시설 번호 목록을 업데이트하는 useEffect
  useEffect(() => {
    if (selectedRoom) {
      // [수정됨] filter 결과가 있는지 확인하여 안정성 높임
      const roomData = library[selectedLibrary].room.find(
        (room) => room.name === selectedRoom,
      );
      if (roomData) {
        setRoomNumberList(roomData.roomNumbers);
        // 첫번째 시설 번호를 기본값으로 설정
        setSelectedRoomNumber(roomData.roomNumbers[0]?.roomNumber || "");
      }
    }
  }, [selectedRoom, selectedLibrary]);

  return (
    <form
      className={"flex flex-col gap-2"}
      action={createLibraryReservationAction}
    >
      {/* ... 학번, 비밀번호, 시간, 기간 select는 동일 ... */}
      <input
        name={"studentId"}
        required={true}
        type={"text"}
        placeholder={"학번"}
      />
      <input
        name={"password"}
        required={true}
        type={"password"}
        placeholder={"포탈 비밀번호"}
      />
      <input name={"date"} type={"date"} />
      <select name="time">
        <option value="09:00">09:00</option>
        <option value="09:30">09:30</option>
        <option value="10:00">10:00</option>
        <option value="10:30">10:30</option>
        <option value="11:00">11:00</option>
        <option value="11:30">11:30</option>
        <option value="12:00">12:00</option>
        <option value="12:30">12:30</option>
        <option value="13:00">13:00</option>
        <option value="13:30">13:30</option>
        <option value="14:00">14:00</option>
        <option value="14:30">14:30</option>
        <option value="15:00">15:00</option>
        <option value="15:30">15:30</option>
        <option value="16:00">16:00</option>
        <option value="16:30">16:30</option>
        <option value="17:00">17:00</option>
        <option value="17:30">17:30</option>
        <option value="18:00">18:00</option>
        <option value="18:30">18:30</option>
        <option value="19:00">19:00</option>
        <option value="19:30">19:30</option>
        <option value="20:00">20:00</option>
        <option value="20:30">20:30</option>
        <option value="21:00">21:00</option>
      </select>
      <select name={"duration"}>
        <option value="30분">30분</option>
        <option value="1시간">1시간</option>
        <option value="1시간30분">1시간 30분</option>
        <option value="2시간">2시간</option>
      </select>

      <select
        name={"library"}
        value={selectedLibrary} // [추가됨] state와 UI를 일치시킴
        onChange={(e) =>
          setSelectedLibrary(e.target.value as "학술정보관" | "중앙도서관")
        }
      >
        <option value={"학술정보관"}>학술정보관</option>
        <option value={"중앙도서관"}>중앙도서관</option>
      </select>
      <select
        name={"room"}
        value={selectedRoom} // [추가됨] state와 UI를 일치시킴
        onChange={(e) => setSelectedRoom(e.target.value)}
      >
        {library[selectedLibrary]?.room.map((roomData, i) => (
          <option key={i} value={roomData.name}>
            {roomData.name}
          </option>
        ))}
      </select>
      <select
        name={"roomNumber"}
        value={selectedRoomNumber} // [추가됨] state와 UI를 일치시킴
        // [수정됨] 올바른 state 업데이트 함수 연결
        onChange={(e) => setSelectedRoomNumber(e.target.value)}
      >
        {roomNumberList?.map((roomData, i) => (
          <option key={i} value={roomData.roomNumber}>
            {roomData.roomNumber} ({roomData.min}인 ~ {roomData.max}인)
          </option>
        ))}
      </select>

      <div>
        <input hidden={true} value={JSON.stringify(participants)} />
        <input
          placeholder={"참가자 학번"}
          type={"text"}
          value={participantId} // [추가됨] state와 UI를 일치시킴
          // [수정됨] 올바른 state 업데이트 함수 연결
          onChange={(e) => setParticipantId(e.target.value)}
        />
        <input
          placeholder={"참가자 전화번호 마지막 4자리"}
          type={"text"}
          value={participantPhone} // [추가됨] state와 UI를 일치시킴
          onChange={(e) => setParticipantPhone(e.target.value)}
        />
        <button
          type={"button"}
          onClick={() => {
            if (participantId.length !== 10 || participantPhone.length !== 4) {
              alert("참가자 학번과 전화번호를 올바르게 입력해주세요.");
              return;
            }
            if (participants.find((p) => p.id === participantId)) {
              alert("이미 추가된 참가자입니다.");
              return;
            }
            setParticipants([
              ...participants,
              { id: participantId, phone: participantPhone },
            ]);
            setParticipantId("");
            setParticipantPhone("");
          }}
        >
          추가
        </button>
      </div>
      <div className={"bg-neutral-100 "}>
        {participants.map((participant, i) => (
          <div
            key={i}
            className={
              "bg-neutral-50 p-1 px-2 rounded-lg flex justify-center gap-1"
            }
          >
            {participant.id} ({participant.phone})
            <button
              className={
                "p-1 px-2 rounded-lg bg-red-600 text-neutral-50 text-sm"
              }
              type={"button"}
              onClick={() =>
                setParticipants((prev) =>
                  prev.filter((p) => p.id !== participant.id),
                )
              }
            >
              삭제
            </button>
          </div>
        ))}
      </div>
      <button
        type={"submit"}
        className={
          "bg-neutral-950 text-neutral-50 p-2 px-4 rounded-lg text-lg font-semibold w-full"
        }
      >
        예약
      </button>
    </form>
  );
}
