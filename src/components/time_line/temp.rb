
Answer:

E                                                                                                                                                  ager loading: Use includes or preload to prevent the N+1 query problem.
Indexing: Make sure frequently queried columns are indexed.
Database queries: Use select to limit the fields retrieved from the database.
Batch processing: Use methods like find_in_batches or in_batches to process large sets of data in chunks.
Caching: Use caching techniques like fragment or Russian doll caching to store frequently requested data.



Answer:
Polymorphic associations allow a model to belong to more than one other model using a single association. For example, a Comment can belong to both a Post and a Photo, and Rails will determine which model the comment belongs to based on a commentable type.

Example:

class Comment < ApplicationRecord
  belongs_to :commentable, polymorphic: true
end

class Post < ApplicationRecord
  has_many :comments, as: :commentable
end

class Photo < ApplicationRecord
  has_many :comments, as: :commentable
end



13. 
Answer:

render: Displays a view within the current request cycle. It is typically used when rendering a template or a partial.

render :show

redirect_to: Redirects the browser to a different URL. It triggers a new HTTP request and is commonly used after a form submission to avoid re-submission if the user refreshes the page. Example:

redirect_to user_path(@user)



def reverse_string(str)
    # Base case: if the string is empty or has only one character, return it
    return str if str.length <= 1
    
    # Recursive case: reverse the substring starting from the second character and append the first character
    return reverse_string(str[1..-1]) + str[0]
end
  
  # Test the function
  input_str = "Hello, world!"
  reversed_str = reverse_string(input_str)
  puts reversed_str



def fibonacci(n)
    # Initializing the first two numbers of the Fibonacci sequence
    a, b = 0, 1
  
    # Print the Fibonacci sequence up to n terms
    n.times do
      print "#{a} "
      a, b = b, a + b # Update a and b to the next two numbers in the series
    end
    puts # To move to the next line after the series is printed
  end
  
  # Test the function
  n = 10 # Change this value to print more or fewer terms
  fibonacci(n)



  def reverse_string(str)
    return str if str.length <= 1
    return reverse_string(str[1..-1]) + str[0]
end


input_str = "Hello, world!"
reversed_str = reverse_string(input_str)
puts reversed_str


def fibonacci(n)
    a, b = 0, 1
    n.times do
        puts  "#{a}"
        a, b = b, a+b
    end
end

n = 10
fibonacci(n)