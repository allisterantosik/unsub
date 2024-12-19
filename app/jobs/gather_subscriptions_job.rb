class GatherSubscriptionsJob < ApplicationJob
  queue_as :default

  def perform(*args)
    imap = Net::IMAP.new("0.0.0.0", port: "3143", ssl: false)
    imap.capabilities    # => ["IMAP4REV1", "LOGINDISABLED"]
    imap.auth_mechanisms # => []

    imap.starttls
    imap.capabilities    # => ["IMAP4REV1", "AUTH=PLAIN", "AUTH=XOAUTH2",
    #     "AUTH=OAUTHBEARER"]
    imap.auth_mechanisms # => ["PLAIN", "XOAUTH2", "OAUTHBEARER"]
  end
end
