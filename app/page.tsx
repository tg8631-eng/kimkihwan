"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";

type LeaveType = "연차" | "반차" | "경조휴가";
type Employee = {
  id: string;
  name: string;
  team: string;
  rank: string;
  joined: string;
  work: string;
  shift: string;
  total: number;
  used: number;
  nightDays: number;
  photoImage: string;
  photoSize: string;
  photoPosition: string;
  event?: "본인결혼" | "부친상" | "배우자출산";
};
type Record = {
  id: string;
  employeeId: string;
  requestedAt: string;
  start: string;
  end: string;
  type: LeaveType;
  days: number;
  reason: string;
  status: "승인";
};
type Result = {
  ok: boolean;
  title: string;
  lines: string[];
  remaining?: number;
};

const initialEmployees: Employee[] = [
  {
    id: "EMP-0012",
    name: "김현수",
    team: "소성1팀",
    rank: "대리",
    joined: "2019.03.04",
    work: "교대",
    shift: "3조3교대",
    total: 15,
    used: 8,
    nightDays: 8,
    photoImage: "/employee-portraits.jpg",
    photoSize: "300% 100%",
    photoPosition: "0%",
  },
  {
    id: "EMP-0034",
    name: "이지은",
    team: "코팅2팀",
    rank: "사원",
    joined: "2022.07.01",
    work: "교대",
    shift: "3조3교대",
    total: 11,
    used: 3,
    nightDays: 10,
    photoImage: "/employee-portraits.jpg",
    photoSize: "300% 100%",
    photoPosition: "50%",
    event: "본인결혼",
  },
  {
    id: "EMP-0056",
    name: "박준혁",
    team: "품질관리팀",
    rank: "과장",
    joined: "2015.11.10",
    work: "주간",
    shift: "주간고정",
    total: 17,
    used: 12,
    nightDays: 0,
    photoImage: "/employee-portraits.jpg",
    photoSize: "300% 100%",
    photoPosition: "100%",
  },
  {
    id: "EMP-0078",
    name: "최서연",
    team: "믹싱팀",
    rank: "대리",
    joined: "2020.05.18",
    work: "교대",
    shift: "2조2교대",
    total: 15,
    used: 6,
    nightDays: 15,
    photoImage: "/employee-portraits-2.jpg",
    photoSize: "300% 100%",
    photoPosition: "0%",
  },
  {
    id: "EMP-0091",
    name: "정민우",
    team: "정비팀",
    rank: "사원",
    joined: "2023.01.16",
    work: "주간",
    shift: "주간고정",
    total: 10,
    used: 2,
    nightDays: 0,
    photoImage: "/employee-portraits-2.jpg",
    photoSize: "300% 100%",
    photoPosition: "50%",
    event: "부친상",
  },
  {
    id: "EMP-0103",
    name: "한예린",
    team: "인사팀",
    rank: "과장",
    joined: "2016.08.22",
    work: "주간",
    shift: "주간고정",
    total: 17,
    used: 15,
    nightDays: 0,
    photoImage: "/employee-portraits-2.jpg",
    photoSize: "300% 100%",
    photoPosition: "100%",
  },
  {
    id: "EMP-0115",
    name: "오태양",
    team: "소성2팀",
    rank: "대리",
    joined: "2018.04.09",
    work: "교대",
    shift: "3조3교대",
    total: 15,
    used: 11,
    nightDays: 7,
    photoImage: "/employee-portraits-3.jpg",
    photoSize: "400% 100%",
    photoPosition: "0%",
  },
  {
    id: "EMP-0127",
    name: "강미래",
    team: "구매팀",
    rank: "사원",
    joined: "2023.08.28",
    work: "주간",
    shift: "주간고정",
    total: 9,
    used: 1,
    nightDays: 0,
    photoImage: "/employee-portraits-3.jpg",
    photoSize: "400% 100%",
    photoPosition: "33.333%",
  },
  {
    id: "EMP-0139",
    name: "유성준",
    team: "안전팀",
    rank: "과장",
    joined: "2014.02.17",
    work: "주간",
    shift: "주간고정",
    total: 18,
    used: 10,
    nightDays: 0,
    photoImage: "/employee-portraits-3.jpg",
    photoSize: "400% 100%",
    photoPosition: "66.667%",
  },
  {
    id: "EMP-0152",
    name: "배나은",
    team: "코팅1팀",
    rank: "사원",
    joined: "2022.01.10",
    work: "교대",
    shift: "3조3교대",
    total: 11,
    used: 4,
    nightDays: 9,
    photoImage: "/employee-portraits-3.jpg",
    photoSize: "400% 100%",
    photoPosition: "100%",
    event: "배우자출산",
  },
];
const initialRecords: Record[] = [
  {
    id: "1",
    employeeId: "EMP-0012",
    requestedAt: "2026.08.01",
    start: "2026-08-10",
    end: "2026-08-10",
    type: "연차",
    days: 1,
    reason: "개인 사유",
    status: "승인",
  },
  {
    id: "2",
    employeeId: "EMP-0012",
    requestedAt: "2024.08.19",
    start: "2024-08-19",
    end: "2024-08-19",
    type: "연차",
    days: 1,
    reason: "개인 사유",
    status: "승인",
  },
  {
    id: "3",
    employeeId: "EMP-0012",
    requestedAt: "2024.07.08",
    start: "2024-07-08",
    end: "2024-07-10",
    type: "연차",
    days: 2,
    reason: "여름휴가",
    status: "승인",
  },
  {
    id: "4",
    employeeId: "EMP-0012",
    requestedAt: "2024.06.03",
    start: "2024-06-03",
    end: "2024-06-03",
    type: "반차",
    days: 0.5,
    reason: "병원 방문",
    status: "승인",
  },
];
const eventDays = { 본인결혼: 5, 부친상: 5, 배우자출산: 3 } as const;
const NIGHT_ALLOWANCE_PER_DAY = 35000;
const policyQuestions = [
  {
    question: "연차와 반차는 어떻게 차감되나요?",
    answer: "연차는 신청 일수만큼, 반차는 0.5일이 잔여 연차에서 차감됩니다. 승인된 이력의 사용 일수를 합산해 잔여 연차를 계산합니다.",
    source: "휴가 운영규정 제12조 제1항 · 연차휴가 사용 및 차감",
  },
  {
    question: "경조휴가는 연차에서 차감되나요?",
    answer: "경조휴가는 등록된 경조사 종류와 허용 일수 내에서 별도로 부여되며, 일반 연차 잔여 일수에서는 차감되지 않습니다.",
    source: "휴가 운영규정 제18조 제2항 · 경조휴가",
  },
  {
    question: "야간근무 수당은 어떤 기준으로 계산되나요?",
    answer: "이 데모는 당월 야간근무일수에 1일 기준 수당을 곱해 예상 금액을 표시합니다. 실제 지급 기준·단가는 급여 규정을 확인해야 합니다.",
    source: "임금 및 수당 운영기준 제7조 · 야간근무 수당 (데모 적용)",
  },
] as const;
const today = "2026-08-05";

function dateLabel(date: string) {
  return date.replaceAll("-", ".");
}
function overlaps(aStart: string, aEnd: string, bStart: string, bEnd: string) {
  return aStart <= bEnd && bStart <= aEnd;
}

export default function Home() {
  const [employees, setEmployees] = useState(initialEmployees);
  const [records, setRecords] = useState(initialRecords);
  const [employeeId, setEmployeeId] = useState(initialEmployees[0].id);
  const [type, setType] = useState<LeaveType>("연차");
  const [start, setStart] = useState("2026-08-17");
  const [end, setEnd] = useState("2026-08-17");
  const [days, setDays] = useState("1");
  const [reason, setReason] = useState("");
  const [result, setResult] = useState<Result | null>(null);
  const [filter, setFilter] = useState<"전체" | LeaveType>("전체");
  const [activePolicy, setActivePolicy] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem("hr-concierge-state");
    if (saved) {
      try {
        const state = JSON.parse(saved);
        const savedEmployees = new Map<string, Employee>(
          state.employees.map((item: Employee) => [item.id, item]),
        );
        setEmployees(
          initialEmployees.map((baseEmployee) => {
            const savedEmployee = savedEmployees.get(baseEmployee.id);
            return savedEmployee
              ? {
                  ...baseEmployee,
                  used: savedEmployee.used,
                }
              : baseEmployee;
          }),
        );
        setRecords(state.records);
      } catch {
        /* keep demo data */
      }
    }
  }, []);
  useEffect(() => {
    if (type === "반차") setDays("0.5");
  }, [type]);

  const employee = employees.find((item) => item.id === employeeId)!;
  const remaining = Number((employee.total - employee.used).toFixed(1));
  const employeeRecords = useMemo(
    () =>
      records
        .filter(
          (item) =>
            item.employeeId === employeeId &&
            (filter === "전체" || item.type === filter),
        )
        .sort((a, b) => b.requestedAt.localeCompare(a.requestedAt)),
    [records, employeeId, filter],
  );

  function evaluate(): Result {
    const requestedDays = Number(days);
    if (
      !start ||
      !reason.trim() ||
      !Number.isFinite(requestedDays) ||
      requestedDays <= 0
    )
      return {
        ok: false,
        title: "입력 내용을 확인해 주세요",
        lines: ["사용 시작일, 사용 일수, 신청 사유는 모두 필수입니다."],
      };
    if (end && end < start)
      return {
        ok: false,
        title: "신청할 수 없습니다",
        lines: ["사용 종료일은 시작일보다 빠를 수 없습니다."],
      };
    const requestEnd = end || start;
    const conflict = records.find(
      (item) =>
        item.employeeId === employeeId &&
        overlaps(start, requestEnd, item.start, item.end),
    );
    if (conflict)
      return {
        ok: false,
        title: "신청할 수 없습니다",
        lines: [
          "선택한 기간에 이미 승인된 휴가가 있습니다.",
          `기존 휴가: ${dateLabel(conflict.start)}${conflict.start !== conflict.end ? ` ~ ${dateLabel(conflict.end)}` : ""} · ${conflict.type} ${conflict.days}일`,
          "수정 방법: 다른 사용일을 선택해 주세요.",
        ],
      };
    if (type === "반차" && requestedDays !== 0.5)
      return {
        ok: false,
        title: "반차는 0.5일로 신청됩니다",
        lines: ["반차는 0.5일로 고정되어 있습니다."],
      };
    if (type === "경조휴가") {
      if (!employee.event)
        return {
          ok: false,
          title: "경조휴가 대상이 아닙니다",
          lines: ["직원 정보에 등록된 경조사 정보가 없습니다."],
        };
      const limit = eventDays[employee.event];
      if (requestedDays > limit)
        return {
          ok: false,
          title: "신청할 수 없습니다",
          lines: [
            `${employee.event} 경조휴가는 최대 ${limit}일까지 신청할 수 있습니다.`,
            `이번 신청 일수: ${requestedDays}일`,
          ],
        };
      return {
        ok: true,
        title: "경조휴가 신청 가능",
        lines: [
          `직원 정보에서 ‘${employee.event}’ 경조사가 확인되었습니다.`,
          `${employee.event} 경조휴가는 최대 ${limit}일까지 사용할 수 있습니다.`,
          "경조휴가는 잔여 연차에서 차감되지 않습니다.",
        ],
        remaining,
      };
    }
    if (requestedDays > remaining)
      return {
        ok: false,
        title: "신청할 수 없습니다",
        lines: [
          `신청 일수는 ${requestedDays}일이지만 현재 잔여 연차는 ${remaining}일입니다.`,
          `신청 일수를 ${remaining}일 이하로 변경해 주세요.`,
        ],
      };
    return {
      ok: true,
      title: "신청 가능합니다",
      lines: [
        `현재 잔여 연차 ${remaining}일 중 ${requestedDays}일을 신청했습니다.`,
        `승인 후 잔여 연차는 ${Number((remaining - requestedDays).toFixed(1))}일입니다.`,
        "기존 승인 이력과 겹치는 날짜가 없습니다.",
      ],
      remaining: Number((remaining - requestedDays).toFixed(1)),
    };
  }

  function check(e: FormEvent) {
    e.preventDefault();
    setResult(evaluate());
  }
  function approve() {
    const evaluation = evaluate();
    setResult(evaluation);
    if (!evaluation.ok) return;
    const requestedDays = Number(days);
    const newRecord: Record = {
      id: crypto.randomUUID(),
      employeeId,
      requestedAt: today.replaceAll("-", "."),
      start,
      end: end || start,
      type,
      days: requestedDays,
      reason: reason.trim(),
      status: "승인",
    };
    const nextEmployees = employees.map((item) =>
      item.id === employeeId && type !== "경조휴가"
        ? { ...item, used: Number((item.used + requestedDays).toFixed(1)) }
        : item,
    );
    const nextRecords = [newRecord, ...records];
    setEmployees(nextEmployees);
    setRecords(nextRecords);
    localStorage.setItem(
      "hr-concierge-state",
      JSON.stringify({ employees: nextEmployees, records: nextRecords }),
    );
    setResult({
      ok: true,
      title: "승인 처리가 완료되었습니다",
      lines: [
        "신청 내역이 즉시 승인 이력에 추가되었습니다.",
        type === "경조휴가"
          ? "경조휴가는 잔여 연차에서 차감되지 않습니다."
          : `잔여 연차가 ${evaluation.remaining}일로 갱신되었습니다.`,
      ],
      remaining: evaluation.remaining,
    });
    setReason("");
  }
  function resetDemo() {
    if (confirm("저장된 데모 데이터를 초기화할까요?")) {
      localStorage.removeItem("hr-concierge-state");
      setEmployees(initialEmployees);
      setRecords(initialRecords);
      setResult(null);
    }
  }
  function downloadLeaveForm() {
    const content = `휴가 신청서\n\n신청자: ${employee.name} (${employee.id})\n소속: ${employee.team}\n직급: ${employee.rank}\n휴가 유형: ____________________\n사용 기간: ____________________\n사용 일수: ____________________\n신청 사유: ____________________\n\n결재자\n1차 ${employee.team} 리더: ____________________\n2차 담당 부장: ____________________\n`;
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${employee.name}_휴가신청서.txt`;
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <main>
      <header className="topbar">
        <div className="brand">
          <span className="brand-mark">H</span>
          <div>
            <strong>HR 시스템</strong>
            <small>개인 맞춤형 휴가 신청 도우미</small>
          </div>
        </div>
        <button className="ghost" onClick={resetDemo}>
          ↻ 데모 데이터 초기화
        </button>
      </header>
      <section className="hero">
        <div>
          <p className="eyebrow">LEAVE MANAGEMENT · DEMO</p>
          <h1>
            휴가 신청 전, <em>가능 여부</em>를<br />
            명확하게 확인하세요.
          </h1>
          <p className="lead">
            개인별 잔여 연차와 기존 이력을 바탕으로 신청 가능 여부와 근거를 즉시
            안내합니다.
          </p>
        </div>
        <div className="hero-note">
          <span>오늘의 안내</span>
          <strong>
            신청 전 중복 일정을
            <br />
            자동으로 확인합니다.
          </strong>
          <i>01</i>
        </div>
      </section>
      <section className="dashboard">
        <div className="employee-panel panel">
          <div className="section-heading">
            <div>
              <p className="eyebrow">01 · PROFILE</p>
              <h2>직원 선택</h2>
            </div>
            <span className="live-dot">데모 운영 중</span>
          </div>
          <label className="select-wrap">
            <span>현재 사용자</span>
            <select
              value={employeeId}
              onChange={(e) => {
                setEmployeeId(e.target.value);
                setResult(null);
              }}
              aria-label="직원 선택"
            >
              {employees.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.id} · {item.name} · {item.team}
                </option>
              ))}
            </select>
          </label>
          <div className="profile">
            <div
              className="avatar employee-photo"
              role="img"
              aria-label={`${employee.name} 직원 프로필 사진`}
              style={{
                backgroundImage: `url("${employee.photoImage}")`,
                backgroundSize: employee.photoSize,
                backgroundPosition: `${employee.photoPosition} center`,
              }}
            />
            <div>
              <h3>
                {employee.name} <span>{employee.rank}</span>
              </h3>
              <p>
                {employee.id} · {employee.team}
              </p>
            </div>
          </div>
          <section className="approval-line" aria-label="결재 라인">
            <div className="approval-heading">
              <span>결재자 지정</span>
              <small>휴가 신청 시 순차 결재</small>
            </div>
            <div className="approver-steps">
              <div className="approver">
                <b>1차</b>
                <div>
                  <strong>{employee.team} 리더</strong>
                  <span>직속 상급자</span>
                </div>
              </div>
              <i>→</i>
              <div className="approver">
                <b>2차</b>
                <div>
                  <strong>담당 부장</strong>
                  <span>상위 결재자</span>
                </div>
              </div>
            </div>
          </section>
          <dl>
            <div>
              <dt>근무형태</dt>
              <dd>
                {employee.work} · {employee.shift}
              </dd>
            </div>
            <div>
              <dt>입사일</dt>
              <dd>{employee.joined}</dd>
            </div>
            <div>
              <dt>당월 야간근무</dt>
              <dd>{employee.nightDays}일</dd>
            </div>
            <div>
              <dt>경조 대상</dt>
              <dd className={employee.event ? "accent" : "muted"}>
                {employee.event ?? "해당 없음"}
              </dd>
            </div>
          </dl>
        </div>
        <div className="stats">
          <article>
            <span>기준 연차</span>
            <strong>
              {employee.total}
              <b>일</b>
            </strong>
            <i>ANNUAL GRANT</i>
          </article>
          <article>
            <span>사용 연차</span>
            <strong>
              {employee.used}
              <b>일</b>
            </strong>
            <i>APPROVED LEAVE</i>
          </article>
          <article className="highlight">
            <span>잔여 연차</span>
            <strong>
              {remaining}
              <b>일</b>
            </strong>
            <i>AVAILABLE NOW</i>
          </article>
        </div>
        <form className="request panel" onSubmit={check}>
          <div className="section-heading">
            <div>
              <p className="eyebrow">02 · REQUEST</p>
              <h2>휴가 신청</h2>
            </div>
            <span className="required">필수 입력</span>
          </div>
          <div className="type-tabs">
            {(["연차", "반차", "경조휴가"] as LeaveType[]).map((item) => (
              <button
                type="button"
                className={type === item ? "active" : ""}
                onClick={() => {
                  setType(item);
                  setResult(null);
                }}
                key={item}
              >
                {item}
              </button>
            ))}
          </div>
          {type === "경조휴가" && (
            <div className="event-notice">
              <span>확인된 경조사</span>
              <b>{employee.event ?? "등록된 경조사 없음"}</b>
              <small>
                {employee.event
                  ? `최대 ${eventDays[employee.event]}일 신청 가능`
                  : "대상 정보가 없습니다"}
              </small>
            </div>
          )}
          <div className="field-grid">
            <label>
              사용 시작일
              <input
                type="date"
                value={start}
                onChange={(e) => setStart(e.target.value)}
                required
              />
            </label>
            <label>
              사용 종료일
              <input
                type="date"
                value={end}
                min={start}
                onChange={(e) => setEnd(e.target.value)}
              />
            </label>
          </div>
          <label>
            사용 일수
            <select
              value={days}
              onChange={(e) => setDays(e.target.value)}
              disabled={type === "반차"}
            >
              {[0.5, 1, 1.5, 2, 3, 4, 5].map((item) => (
                <option key={item} value={item}>
                  {item}일
                </option>
              ))}
            </select>
          </label>
          <label>
            신청 사유
            <input
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="예: 개인 사유, 병원 방문"
              maxLength={80}
              required
            />
          </label>
          <button className="primary" type="submit">
            신청 가능 여부 확인 <span>→</span>
          </button>
        </form>
        <section
          className={`result panel ${result ? (result.ok ? "success" : "failure") : "empty"}`}
        >
          <div className="section-heading">
            <div>
              <p className="eyebrow">03 · DECISION</p>
              <h2>신청 가능 여부</h2>
            </div>
          </div>
          {result ? (
            <>
              <div className="status">
                <span>{result.ok ? "✓" : "×"}</span>
                <div>
                  <b>{result.title}</b>
                  <small>
                    {result.ok
                      ? "규칙 검증이 완료되었습니다"
                      : "입력값을 조정한 뒤 다시 확인해 주세요"}
                  </small>
                </div>
              </div>
              <ul>
                {result.lines.map((line, i) => (
                  <li key={i}>{line}</li>
                ))}
              </ul>
              {result.ok && (
                <button className="approve" type="button" onClick={approve}>
                  신청 확정 및 즉시 승인 <span>✓</span>
                </button>
              )}
            </>
          ) : (
            <div className="empty-state">
              <div>✓</div>
              <p>
                신청 정보를 입력한 후<br />
                <b>가능 여부를 확인</b>해 주세요.
              </p>
            </div>
          )}
        </section>
      </section>
      <section className="history panel">
        <div className="history-head">
          <div>
            <p className="eyebrow">04 · HISTORY</p>
            <h2>{employee.name}님의 휴가 사용 이력</h2>
          </div>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as "전체" | LeaveType)}
            aria-label="휴가 유형 필터"
          >
            <option>전체</option>
            <option>연차</option>
            <option>반차</option>
            <option>경조휴가</option>
          </select>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>신청일</th>
                <th>사용 기간</th>
                <th>유형</th>
                <th>일수</th>
                <th>상태</th>
                <th>신청 사유</th>
              </tr>
            </thead>
            <tbody>
              {employeeRecords.length ? (
                employeeRecords.map((item) => (
                  <tr key={item.id}>
                    <td>{item.requestedAt}</td>
                    <td>
                      {dateLabel(item.start)}
                      {item.start !== item.end && ` ~ ${dateLabel(item.end)}`}
                    </td>
                    <td>
                      <span className="type-pill">{item.type}</span>
                    </td>
                    <td>{item.days}일</td>
                    <td>
                      <span className="approved">승인</span>
                    </td>
                    <td>{item.reason}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="none">
                    조건에 맞는 이력이 없습니다.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
      <section className="assist-grid">
        <section className="policy panel">
          <div className="section-heading">
            <div>
              <p className="eyebrow">05 · POLICY Q&A</p>
              <h2>규정 질의응답</h2>
            </div>
            <span className="demo-badge">데모 규정</span>
          </div>
          <div className="policy-body">
            <div className="policy-list" role="tablist" aria-label="규정 질문">
              {policyQuestions.map((item, index) => (
                <button
                  type="button"
                  key={item.question}
                  className={activePolicy === index ? "active" : ""}
                  onClick={() => setActivePolicy(index)}
                >
                  <span>Q{index + 1}</span>
                  {item.question}
                </button>
              ))}
            </div>
            <article className="policy-answer">
              <span className="answer-mark">A</span>
              <p>{policyQuestions[activePolicy].answer}</p>
              <small>근거 조항 · {policyQuestions[activePolicy].source}</small>
            </article>
          </div>
        </section>
        <section className="calculator panel">
          <div className="section-heading">
            <div>
              <p className="eyebrow">06 · PERSONAL CALCULATOR</p>
              <h2>개인 데이터 계산</h2>
            </div>
          </div>
          <div className="calc-items">
            <article>
              <span>연차 잔여</span>
              <strong>{remaining}<b>일</b></strong>
              <small>기준 {employee.total}일 − 사용 {employee.used}일</small>
            </article>
            <article>
              <span>당월 야간수당 예상</span>
              <strong>{(employee.nightDays * NIGHT_ALLOWANCE_PER_DAY).toLocaleString("ko-KR")}<b>원</b></strong>
              <small>야간 {employee.nightDays}일 × 35,000원 <em>데모 단가</em></small>
            </article>
          </div>
          <p className="calc-note">실제 지급액은 급여 규정·근무시간·가산율에 따라 달라질 수 있습니다.</p>
        </section>
        <section className="support panel">
          <div>
            <p className="eyebrow">07 · FORMS & SUPPORT</p>
            <h2>신청 서식 · 담당 부서</h2>
          </div>
          <button className="form-download" type="button" onClick={downloadLeaveForm}>
            <span>↓</span><div><b>휴가 신청서 다운로드</b><small>{employee.name}님 정보가 반영됩니다</small></div>
          </button>
          <div className="support-contact">
            <span>담당 부서</span>
            <strong>HR 운영지원팀</strong>
            <a href="mailto:hr-operations@hr-system.example?subject=HR%20%EC%8B%9C%EC%8A%A4%ED%85%9C%20%EB%AC%B8%EC%9D%98">hr-operations@hr-system.example</a>
            <small>내선 1204 · 평일 09:00–18:00</small>
          </div>
        </section>
      </section>
      <footer>
        HR 시스템 · LOCAL DEMO{" "}
        <span>개인정보가 포함된 실제 운영 데이터에는 사용하지 마세요.</span>
      </footer>
    </main>
  );
}
