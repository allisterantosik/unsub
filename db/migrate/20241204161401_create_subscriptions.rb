class CreateSubscriptions < ActiveRecord::Migration[8.0]
  def change
    create_table :subscriptions do |t|
      t.string :name
      t.references :user, null: false, foreign_key: true
      t.integer :status
      t.string :email

      t.timestamps
    end
  end
end
