# frozen_string_literal: true

class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable,
         :rememberable, :trackable, :validatable

  devise :recoverable unless Rails.application.secrets.ldap[:enabled]

  has_many :work_times, dependent: :destroy
  has_many :accounting_periods, dependent: :destroy
  has_many :accounting_periods_recounts, dependent: :destroy
  has_many :projects, foreign_key: :leader_id, dependent: :nullify, inverse_of: :leader
  has_many :project_report_roles, dependent: :destroy
  has_many :vacations, dependent: :destroy
  has_many :vacation_interactions, dependent: :destroy
  has_many :vacation_periods, dependent: :destroy
  has_many :hardwares, dependent: :destroy
  validates :first_name, :last_name, presence: true

  scope :active, -> { where(active: true) }

  def self.with_next_and_previous_user_id
    from(%(
      (
        SELECT
          users.*,
          LAG(users.id) OVER(PARTITION BY active ORDER BY contract_name::bytea ASC) AS prev_id,
          LEAD(users.id) OVER(PARTITION BY active ORDER BY contract_name::bytea ASC) AS next_id
        FROM users
        ORDER BY contract_name::bytea ASC
      ) users
    ))
  end

  def self.filter_by(action)
    case action
    when :active then where(active: true)
    when :inactive then where(active: false)
    else all
    end
  end

  def active_for_authentication?
    super && active?
  end

  def password_required?
    new_record? ? false : super
  end

  def leader?
    project_ids.any?
  end

  def to_s
    [last_name, first_name].join(' ')
  end

  def admin?
    admin || staff_manager
  end

  # rubocop:disable MethodLength
  def as_json(_options = {})
    {
      id: id,
      first_name: first_name,
      last_name: last_name,
      projects: project_ids,
      is_leader: leader?,
      admin: admin?,
      manager: manager,
      lang: lang,
      staff_manager: staff_manager
    }
  end
  # rubocop:enable MethodLength

  def destroy
    update(active: false)
    self
  end

  def available_vacation_days
    last_vacation_period = vacation_periods.last
    used_vacation_days = 0
    vacations.current_year.where(status: :accepted, vacation_type: %w[planned requested]).find_each do |vacation|
      used_vacation_days += vacation.start_date.business_days_until(vacation.end_date + 1.day)
    end
    last_vacation_period.nil? ? 0 - used_vacation_days : last_vacation_period.vacation_days - used_vacation_days
  end

  def used_vacation_days(vacations)
    hash = { planned: 0, requested: 0, compassionate: 0, paternity: 0, parental: 0, upbringing: 0,
             unpaid: 0, rehabilitation: 0, illness: 0, care: 0 }
    vacations.accepted.find_each do |vacation|
      if vacation.vacation_type == 'others'
        hash[vacation.vacation_sub_type.to_sym] += vacation.start_date.business_days_until(vacation.end_date + 1.day)
      else
        hash[vacation.vacation_type.to_sym] += vacation.start_date.business_days_until(vacation.end_date + 1.day)
      end
    end
    hash.except(:planned)
  end
end
